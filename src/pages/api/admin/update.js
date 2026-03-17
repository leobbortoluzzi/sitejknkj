import { env } from 'cloudflare:workers';

export const POST = async ({ request, locals }) => {
    
    // O middleware já verificou a autenticação, então podemos confiar.
    const newData = await request.json();
    await env.kv.put("landing_page_data_v1", JSON.stringify(newData));
    
    return new Response(JSON.stringify({ success: true }), {
        headers: { "Content-Type": "application/json" }
    });
};
