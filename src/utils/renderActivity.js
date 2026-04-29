import { processActivityData } from "./dataProcessors.js";

export function renderActivity(data) {
  if (!data || !Array.isArray(data) || data.length === 0) {
    const container = document.getElementById("activity-container");
    container.innerHTML = "No hay datos para mostrar";
    container.className =
      "text-[#F14A00] text-center text-2xl py-20 border-2 border-[#F14A00]/20 rounded-xl mb-32";
    return;
  }
  
  const { dateAxis, totalCommits } = processActivityData(data);
  
  const canvas = document.getElementById("activity-chart");
  const ctx = canvas.getContext("2d");

  createChart(dateAxis, totalCommits, ctx);
}

function createChart(labels, commits, ctx) {
  if (window.activityChart) {
    window.activityChart.destroy();
  }

  window.activityChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Commits por mes",
          data: commits,
          borderColor: "rgb(223,101,0)",
          backgroundColor: "rgba(241, 74, 0, 0.2)",
          borderWidth: 3,
          hoverOffset: 15,
          hoverBorderColor: "#FFFFFF",
          hoverBorderWidth: 3,
          fill: true,
          tension: 0.4,
        },
      ],
    },
    options: {
      scales: {
        x: {
          ticks: {
            color: "#FFFFFF",
            font: {
              size: window.innerWidth < 768 ? 9 : 14, // Más pequeño en móvil
            },
            maxRotation: 45,
            minRotation: 0, // En desktop puede ser horizontal
            autoSkip: true, // ← CAMBIADO: Deja que Chart.js decida
            maxTicksLimit: window.innerWidth < 768 ? 6 : 14, // Menos etiquetas en móvil
          },
          grid: {
            color: "rgba(255, 255, 255, 0.05)",
            drawBorder: false,
          },
        },
        y: {
          beginAtZero: true,
          ticks: {
            color: "#FFFFFF",
            font: {
              size: 13,
            },
          },
          grid: {
            color: "rgba(255, 255, 255, 0.05)",
            drawBorder: false,
          },
        },
      },
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: {
          top: 10,
          bottom: 10,
          left: 0,
          right: 0,
        },
      },
      plugins: {
        legend: {
          display: false,
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
              return context.label + ": " + context.parsed.y + " commits";
            },
          },
        },
      },
    },
  });
}
