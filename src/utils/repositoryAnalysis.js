export async function getFormDataAndFetch(form) {
    const user = form.querySelector('#user').value;
    const repository = form.querySelector('#repository').value;

    const formData = new FormData();
    formData.append('user', user);
    formData.append('repository', repository);

    const response = await fetch('/api/github', {
        method: 'POST', body: formData
    })

    return await response.json();
}

export function renderData(data) {
    const listSummary = ['name', 'description', 'stargazers_count', 'forks', 'created_at', 'updated_at'];

    for (let key of listSummary) {
        if (key === 'created_at' || key === 'updated_at') {
            data[key] = formatDate(data[key]);
        }
        document.getElementById(key).innerHTML = data[key] ? data[key] : '-';
    }
}

function formatDate(input) {
    const d = input instanceof Date ? input : new Date(input);
    if (Number.isNaN(d.getTime())) return '';
    return d
        .toLocaleDateString('es-ES', {day: 'numeric', month: 'long', year: 'numeric'})
        .replace(/\sde\s/g, ' ');
}