export const prerender = false;

export async function POST(request) {
  try {
    const formData = await request.request.formData();
    const user = formData.get("user");
    const repository = formData.get("repository");

    const baseUrl = `https://api.github.com/repos/${user}/${repository}`;

    const fetchOptions = {
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "Astro-Code-Analyzer-App",
      },
    };

    const [response1, response2, response3, response4] =
      await Promise.allSettled([
        fetch(baseUrl, fetchOptions),
        fetch(baseUrl + "/languages", fetchOptions),
        fetch(baseUrl + "/contributors", fetchOptions),
        fetch(baseUrl + "/stats/commit_activity", fetchOptions),
      ]);

    const overviewResponse = returnStatusFulfilled(response1)
      ? await response1.value.json()
      : null;
    const languagesResponse = returnStatusFulfilled(response2)
      ? await response2.value.json()
      : null;
    const contributorsResponse = returnStatusFulfilled(response3)
      ? await response3.value.json()
      : null;
    const commitActivityResponse = returnStatusFulfilled(response4)
      ? await response4.value.json()
      : null;

    const data = {
      overviewResponse,
      languagesResponse,
      contributorsResponse,
      commitActivityResponse,
    };

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error al llamar a la API de GitHub:", error);
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
}

function returnStatusFulfilled(response) {
  return response.status === "fulfilled";
}
