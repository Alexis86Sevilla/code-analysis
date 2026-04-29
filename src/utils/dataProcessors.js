import { formatMonth } from "./formatters.js";

export function processLanguageData(data) {
  if (!data) return { names: [], percentages: [] };
  const results = Object.entries(data).sort((a, b) => b[1] - a[1]);
  const top10 = results.slice(0, 10);
  const others = results.slice(10);

  const totalBytes = results.reduce((suma, [key, value]) => suma + value, 0);
  const totalOthers = others.reduce((suma, [key, value]) => suma + value, 0);

  const names = top10.map(([key, value]) => key);
  const percentages = top10.map(([key, value]) => (value / totalBytes) * 100);
  const percentagesOthers = (totalOthers / totalBytes) * 100;

  return {
    names: [...names, "Otros"],
    percentages: [...percentages, percentagesOthers],
  };
}

export function processContributorsData(data) {
  if (!data || !Array.isArray(data)) return { names: [], contributions: [], top5: [] };
  const results = [...data].sort((a, b) => b.contributions - a.contributions);
  const top5 = results.slice(0, 5);
  return {
    names: top5.map((e) => e.login),
    contributions: top5.map((e) => e.contributions),
    top5,
  };
}

export function processActivityData(data) {
  if (!data || !Array.isArray(data)) return { dateAxis: [], totalCommits: [] };
  let monthsData = {};
  for (let week of data) {
    const date = new Date(week.week * 1000);
    const month = formatMonth(date);
    const monthNumber = date.getMonth();
    const commits = week.total;

    if (monthsData[month]) {
      monthsData[month].commits += commits;
    } else {
      monthsData[month] = { commits: commits, monthNumber: monthNumber };
    }
  }

  const results = Object.entries(monthsData).sort(
    (a, b) => a[1].monthNumber - b[1].monthNumber,
  );

  return {
    dateAxis: results.map((e) => e[0]),
    totalCommits: results.map((e) => e[1].commits),
  };
}
