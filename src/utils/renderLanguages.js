import { processLanguageData } from "./dataProcessors.js";

export function renderLanguages(data) {
  if (!data) return;

  const { names, percentages } = processLanguageData(data);
  const canvas = document.getElementById("languages-chart");
  const ctx = canvas.getContext("2d");

  createChart(names, percentages, ctx);
}

function createChart(names, percentages, ctx) {
  if (window.languagesChart) {
    window.languagesChart.destroy();
  }

  window.languagesChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: names,
      datasets: [
        {
          label: "Porcentaje de uso",
          data: percentages,
          backgroundColor: [
            "#F14A00",
            "#C62300",
            "#8B4513",
            "#FFD700",
            "#9370DB",
            "#FF69B4",
            "#20B2AA",
            "#FF8C00",
            "#4169E1",
            "#32CD32",
            "#A9A9A9",
          ],
          borderColor: "rgba(255, 255, 255, 0.5)",
          borderWidth: 2,
          hoverOffset: 15,
          hoverBorderColor: "#FFFFFF",
          hoverBorderWidth: 3,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: {
          top: 10,
          bottom: 10,
          left: 10,
          right: 10,
        },
      },
      plugins: {
        legend: {
          display: true,
          position: window.innerWidth < 768 ? "bottom" : "right",
          labels: {
            color: "#FFFFFF",
            font: {
              size: 15,
              weight: "600",
            },
            padding: 18,
            boxWidth: 20,
            boxHeight: 20,
            generateLabels: function (chart) {
              const data = chart.data;
              return data.labels.map((label, i) => ({
                text: `${label}: ${data.datasets[0].data[i].toFixed(1)}%`,
                fillStyle: data.datasets[0].backgroundColor[i],
                strokeStyle: "rgba(255, 255, 255, 0.5)",
                lineWidth: 1,
                hidden: false,
                index: i,
                fontColor: "#FFFFFF",
                color: "#FFFFFF",
              }));
            },
          },
        },
        tooltip: {
          backgroundColor: "rgba(0,0,0,0.87)",
          titleColor: "#FFFFFF",
          bodyColor: "#FFFFFF",
          borderColor: "#F14A00",
          borderWidth: 2,
          padding: 12,
          callbacks: {
            label: function (context) {
              return context.label + ": " + context.parsed.toFixed(2) + "%";
            },
          },
        },
      },
    },
  });
}
