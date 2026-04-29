import { formatDate } from "./formatters.js";

export function renderOverview(data) {
  if (!data) return;
  const listSummary = [
    "name",
    "description",
    "stargazers_count",
    "forks",
    "created_at",
    "updated_at",
  ];

  listSummary.forEach((key) => {
    const el = document.getElementById(key);
    if (el) el.textContent = "";

    let value = data[key];
    if ((key === "created_at" || key === "updated_at") && value) {
      value = formatDate(value);
    }
    if (el) el.textContent = value || "-";
  });
}
