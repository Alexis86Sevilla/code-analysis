import { fetchWithHeaders } from "../../utils/httpClient.js";

export const prerender = false;

export async function POST(request) {
  try {
    const formData = await request.request.formData();
    const user = formData.get("user");
    const repository = formData.get("repository");

    const baseUrl = `https://api.github.com/repos/${user}/${repository}`;

    const [response1, response2, response3, response4] =
      await Promise.allSettled([
        fetchWithHeaders(baseUrl),
        fetchWithHeaders(baseUrl + "/languages"),
        fetchWithHeaders(baseUrl + "/contributors"),
        fetchWithHeaders(baseUrl + "/stats/commit_activity"),
      ]);

    const overviewResponse = returnStatusFulfilled(response1) && response1.value.ok
      ? await response1.value.json()
      : null;

    if (!overviewResponse) {
      return new Response(JSON.stringify({ error: "Repositorio no encontrado o límite de API excedido" }), { status: 404 });
    }

    const languagesResponse = returnStatusFulfilled(response2) && response2.value.ok
      ? await response2.value.json()
      : {};
    const contributorsResponse = returnStatusFulfilled(response3) && response3.value.ok
      ? await response3.value.json()
      : [];
    const commitActivityResponse = returnStatusFulfilled(response4) && response4.value.ok
      ? await response4.value.json()
      : [];

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
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

function returnStatusFulfilled(response) {
  return response.status === "fulfilled";
}
