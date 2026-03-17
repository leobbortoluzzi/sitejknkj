import { verifyToken } from './utils/auth.js';
import { env } from 'cloudflare:workers';

export const onRequest = async (context, next) => {
    const { request, url, locals, redirect } = context;
    const cfContext = locals.cfContext;

    // Se as chaves do Cloudflare não existirem localmente, não faz nada (no `astro dev` pode dar erro se não tiver wrangler ligado, então previne crash)
    if (!env || !env.secret || !env.kv) {
        if (url.pathname.startsWith('/admin')) {
            return new Response("Configuração pendente: variáveis ou KV ausentes no Cloudflare.", { status: 500 });
        }
        return next();
    }

    // =====================================
    // SISTEMA DE LOGS NO KV
    // =====================================
    if (!url.pathname.startsWith('/admin') && !url.pathname.startsWith('/api') && !url.pathname.includes('.')) {
        const cf = request.cf || {};
        const ip = request.headers.get("cf-connecting-ip") || "unknown";
        const ua = request.headers.get("user-agent") || "unknown";
        const country = cf.country || "Desconhecido";
        const city = cf.city || "Desconhecido";
        const asn = cf.asOrganization || "Desconhecido";
        const colo = cf.colo || "Desconhecido";
        const protocol = cf.httpProtocol || "Desconhecido";
        const timezone = cf.timezone || "Desconhecido";
        const timestamp = Date.now();

        cfContext.waitUntil(
            (async () => {
                try {
                    let logs = await env.kv.get("site_logs", "json") || [];
                    logs.unshift({ timestamp, method: request.method, url: request.url, ip, ua, country, city, asn, colo, protocol, timezone });
                    if (logs.length > 50) logs = logs.slice(0, 50);
                    await env.kv.put("site_logs", JSON.stringify(logs));
                } catch (e) {
                    console.error("KV Log Error:", e);
                }
            })()
        );
    }

    // =====================================
    // PROTEÇÃO DE ROTAS ADMIN (AUTH)
    // =====================================
    if (url.pathname.startsWith('/admin')) {
        const cookieHeader = request.headers.get("Cookie") || "";
        const match = cookieHeader.match(/admin_token=([^;]+)/);
        const token = match ? match[1] : null;
        const isValid = await verifyToken(token, env.secret);

        locals.user = isValid ? { token } : null;

        if (url.pathname === '/admin') {
            if (isValid) return redirect('/admin/dashboard', 302);
            return redirect('/admin/login', 302);
        }

        if (url.pathname === '/admin/login' && isValid) {
            return redirect('/admin/dashboard', 302);
        }

        // Rotas que exigem login, exceto a tela de login
        if (!isValid && url.pathname !== '/admin/login') {
             return redirect('/admin/login', 302);
        }
    }

    return next();
};
