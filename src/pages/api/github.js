export const prerender = false;

export async function POST(request) {
    const formData = await request.request.formData();
    const user = formData.get('user');
    const repository = formData.get('repository');

    const baseUrl = `https://api.github.com/repos/${user}/${repository}`;

    const [response1, response2, response3, response4] = await Promise.allSettled([
        fetch(baseUrl),
        fetch(baseUrl + "/languages"),
        fetch(baseUrl + "/contributors"),
        fetch(baseUrl + "/stats/commit_activity")
    ]);

    const overviewResponse = returnStatusFulfilled(response1) ? await response1.value.json() : null;
    const languagesResponse = returnStatusFulfilled(response2) ? await response2.value.json() : null;
    const contributorsResponse = returnStatusFulfilled(response3) ? await response3.value.json() : null;
    const commitActivityResponse = returnStatusFulfilled(response4) ? await response4.value.json() : null;

    return new Response(JSON.stringify({
        overviewResponse,
        languagesResponse,
        contributorsResponse,
        commitActivityResponse
    }));
}

function returnStatusFulfilled(response) {
    return response.status === 'fulfilled';
}