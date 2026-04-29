export function formatDate(input, options = {}) {
  const d = input instanceof Date ? input : new Date(input);
  if (Number.isNaN(d.getTime())) return "";
  const defaultOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  return d
    .toLocaleDateString("es-ES", { ...defaultOptions, ...options })
    .replace(/\sde\s/g, " ");
}

export function formatMonth(input) {
  const d = input instanceof Date ? input : new Date(input);
  if (Number.isNaN(d.getTime())) return "";
  return d
    .toLocaleDateString("es-ES", { month: "short" })
    .replace(/\sde\s/g, " ");
}
