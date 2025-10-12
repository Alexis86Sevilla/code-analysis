const MOCK_DATA = [
    {
        login: "Sir_Codealot",
        contributions: 912,
        avatar_url: "https://avatars.githubusercontent.com/u/900690?v=4",
        url: "https://github.com/Sir_Codealot"
    },
    {
        login: "SpamAndPush",
        contributions: 845,
        avatar_url: "https://avatars.githubusercontent.com/u/900690?v=4",
        url: "https://github.com/SpamAndPush"
    },
    {
        login: "DeadParrotDev",
        contributions: 732,
        avatar_url: "https://avatars.githubusercontent.com/u/900690?v=4",
        url: "https://github.com/DeadParrotDev"
    },
    {
        login: "NiKnight_42",
        contributions: 688,
        avatar_url: "https://avatars.githubusercontent.com/u/900690?v=4",
        url: "https://github.com/NiKnight_42"
    },
    {
        login: "MinistryOfMerges",
        contributions: 176,
        avatar_url: "https://avatars.githubusercontent.com/u/900690?v=4",
        url: "https://github.com/MinistryOfMerges"
    },
    {
        login: "TheHolyPullRequest",
        contributions: 1543,
        avatar_url: "https://avatars.githubusercontent.com/u/900690?v=4",
        url: "https://github.com/TheHolyPullRequest"
    }
];

export function renderContributors(data, useMock = false) {
    const dataToUse = useMock ? MOCK_DATA : data;

    const results = dataToUse.sort((a, b) => b.contributions - a.contributions);

    const top5 = results.slice(0, 5);

    const names = top5.map((e) => e.login);
    const contributions = top5.map((e) => e.contributions);
    const avatars = top5.map((e) => e.avatar_url);
    const links = top5.map((e) => e.url);

    const canvas = document.getElementById('contributors-chart');
    const ctx = canvas.getContext('2d');

    createChart(names, contributions, ctx);
    renderAvatarsWithLinks(top5);
}

function createChart(names, contributions, ctx) {
    if (window.contributors) {
        window.contributors.destroy();
    }

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: names,
            datasets: [{
                label: 'Cantidad contribuciones',
                data: contributions,
                backgroundColor: function(context) {
                    const chart = context.chart;
                    const {ctx, chartArea} = chart;

                    if (!chartArea) return null;

                    const colors = [
                        ['#FF6B35', '#9D4EDD'],
                        ['#06FFA5', '#4361EE'],
                        ['#FFD60A', '#FF006E'],
                        ['#F72585', '#4CC9F0'],
                        ['#52B788', '#FCA311'],
                    ];

                    const index = context.dataIndex;
                    const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);

                    gradient.addColorStop(0, colors[index][0]);
                    gradient.addColorStop(1, colors[index][1]);

                    return gradient;
                },
                borderColor: 'rgba(255, 255, 255, 0.3)',
                borderWidth: 2,
                borderRadius: 12,
                borderSkipped: false,
                hoverOffset: 15,
                hoverBorderColor: '#FFFFFF',
                hoverBorderWidth: 3
            }]
        },
        options: {
            scales: {
                x: {
                    ticks: {
                        color: '#FFFFFF',
                        font: {
                            size: 13
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)',
                        drawBorder: false
                    }
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#FFFFFF',
                        font: {
                            size: 13
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)',
                        drawBorder: false
                    }
                }
            },
            responsive: true,
            maintainAspectRatio: false,
            layout: {
                padding: {
                    top: 10,
                    bottom: 10,
                    left: 0,
                    right: 0
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0,0,0,0.87)',
                    titleColor: '#FFFFFF',
                    bodyColor: '#FFFFFF',
                    borderColor: '#F14A00',
                    borderWidth: 2,
                    padding: 12,
                    callbacks: {
                        label: function (context) {
                            return context.label + ': ' + context.parsed.y + ' contribuciones';
                        }
                    }
                }
            }
        }
    });
}

function renderAvatarsWithLinks(top5) {
    const container = document.getElementById('contributors-list');

    const html = top5.map((contributor, index) => `
        <a href="${contributor.url}" 
           target="_blank" 
           rel="noopener noreferrer"
           class="group flex flex-col items-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border-2 border-white/20 hover:border-[#F14A00] transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#F14A00]/30 min-w-[140px] max-w-[180px]">
            
            <div class="relative mb-4">
                <img src="${contributor.avatar_url}" 
                     alt="${contributor.login}" 
                     class="w-24 h-24 rounded-full border-4 border-white/30 group-hover:border-[#F14A00] transition-all duration-300 object-cover" />
                <div class="absolute -top-2 -right-2 bg-gradient-to-r from-[#F14A00] to-[#C62300] text-white text-xs font-bold rounded-full w-8 h-8 flex items-center justify-center shadow-lg">
                    #${index + 1}
                </div>
            </div>
            
            <p class="text-white font-semibold text-center mb-2 group-hover:text-[#F14A00] transition-colors truncate w-full px-2">
                ${contributor.login}
            </p>
            
            <span class="text-gray-300 text-sm font-medium">
                ${contributor.contributions.toLocaleString('es-ES')} commits
            </span>
        </a>
    `).join('');

    container.innerHTML = html;
}
