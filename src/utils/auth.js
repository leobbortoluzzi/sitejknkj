export async function encryptPassword(password, secret) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password + secret);
    const hash = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hash))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }
  
  // Base64URL encoding/decoding helpers
function base64urlEncode(data) {
  const base64 = btoa(String.fromCharCode(...new Uint8Array(data)));
  return base64.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

function base64urlDecode(str) {
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  while (str.length % 4) str += '=';
  const binary = atob(str);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

export async function createToken(payload, secret, expiresInSeconds = 86400) {
  const encoder = new TextEncoder();
  
  const header = { alg: "HS256", typ: "JWT" };
  const encodedHeader = base64urlEncode(encoder.encode(JSON.stringify(header)));
  
  // Add expiration to payload if not present
  if (expiresInSeconds) {
    payload.exp = Math.floor(Date.now() / 1000) + expiresInSeconds;
  }
  
  const encodedPayload = base64urlEncode(encoder.encode(JSON.stringify(payload)));
  
  const key = await crypto.subtle.importKey(
    "raw", 
    encoder.encode(secret), 
    { name: "HMAC", hash: "SHA-256" }, 
    false, 
    ["sign"]
  );
  
  const signatureBuffer = await crypto.subtle.sign(
    "HMAC", 
    key, 
    encoder.encode(`${encodedHeader}.${encodedPayload}`)
  );
  
  const encodedSignature = base64urlEncode(signatureBuffer);

  return `${encodedHeader}.${encodedPayload}.${encodedSignature}`;
}

export async function verifyToken(token, secret) {
  if (!token) return false;
  
  const parts = token.split('.');
  if (parts.length !== 3) return false;
  
  const [encodedHeader, encodedPayload, signature] = parts;
  const encoder = new TextEncoder();
  
  try {
    const key = await crypto.subtle.importKey(
      "raw", 
      encoder.encode(secret), 
      { name: "HMAC", hash: "SHA-256" }, 
      false, 
      ["verify"]
    );
    
    const data = encoder.encode(`${encodedHeader}.${encodedPayload}`);
    const signatureBuffer = base64urlDecode(signature);
    
    const isValid = await crypto.subtle.verify("HMAC", key, signatureBuffer, data);
    
    if (isValid) {
        try {
            const payload = JSON.parse(new TextDecoder().decode(base64urlDecode(encodedPayload)));
            if (payload.exp && Math.floor(Date.now() / 1000) > payload.exp) {
                return false; // Token expired
            }
        } catch (e) {
            return false;
        }
    }
    
    return isValid;
  } catch (err) {
    return false;
  }
}
  
