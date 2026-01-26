export async function getFormDataAndFetch(form) {
  const user = form.querySelector("#user").value;
  const repository = form.querySelector("#repository").value;

  const formData = new FormData();
  formData.append("user", user);
  formData.append("repository", repository);

  const response = await fetch("/api/github", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) throw new Error("Error en la petición a GitHub");

  return await response.json();
}
