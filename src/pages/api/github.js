export const prerender = false;

export async function POST(request) {
    const formData = await request.request.formData();
    const user = formData.get('user');
    const repository = formData.get('repository');

    const response = await fetch("https://api.github.com/repos/" + user + "/" + repository + "", {
        method: "GET",

    });

    const data = await response.json();
    return new Response(JSON.stringify(data));
}