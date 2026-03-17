export const GET = async ({ redirect }) => {
    return new Response("Saindo...", {
        status: 302,
        headers: {
            "Location": "/admin/login",
            "Set-Cookie": "admin_token=; Path=/admin; Max-Age=0; HttpOnly; SameSite=Strict"
        }
    });
};
