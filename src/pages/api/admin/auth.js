import { encryptPassword, createToken } from '../../../utils/auth.js';
import { env } from 'cloudflare:workers';

export const POST = async ({ request, locals }) => {
    const body = await request.json();
    const isFirstAccess = !(await env.kv.get("admin_hash"));

    if (body.action === 'setup') {
        if (!isFirstAccess) return new Response(JSON.stringify({ error: "Já configurado" }), { status: 400 });
        const hashed = await encryptPassword(body.password, env.secret);
        await env.kv.put("admin_hash", hashed);
        
        const token = await createToken({ auth: true, t: Date.now() }, env.secret);
        return new Response(JSON.stringify({ success: true }), {
            headers: {
                "Content-Type": "application/json",
                "Set-Cookie": `admin_token=${token}; HttpOnly; Path=/admin; Max-Age=86400; SameSite=Strict`
            }
        });
    }

    if (body.action === 'login') {
        const savedHash = await env.kv.get("admin_hash");
        const inputHash = await encryptPassword(body.password, env.secret);
        if (savedHash === inputHash) {
            const token = await createToken({ auth: true, t: Date.now() }, env.secret);
            return new Response(JSON.stringify({ success: true }), {
                headers: {
                    "Content-Type": "application/json",
                    "Set-Cookie": `admin_token=${token}; HttpOnly; Path=/admin; Max-Age=86400; SameSite=Strict`
                }
            });
        }
        return new Response(JSON.stringify({ error: "Senha inválida" }), { status: 401 });
    }

    return new Response(JSON.stringify({ error: "Ação inválida" }), { status: 400 });
};
