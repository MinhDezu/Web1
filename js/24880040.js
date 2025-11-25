const API = 'https://web1-api.vercel.app/api';
const AUTHENTICATION_API = 'https://web1-api.vercel.app/users';

async function loadData(request, templateId, viewId) {
                const response = await fetch(`${API}/${request}`);
                const data = await response.json();
                
                var source = document.getElementById(templateId).innerHTML;
                var template = Handlebars.compile(source);
                var context = { data: data };
                var html = template(context);
                var view = document.getElementById(viewId);
                view.innerHTML = template(context);
}

function getAuthenticateToken(username, password) {
    let response = await fetch(`${AUTHENTICATION_API}/authenticate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accpet': 'application/json'
        },
        body: JSON.stringify({username: username, password })
    });
    let result = await response.json();
    if (response.status == 200) {
        return result.token;
    }
    throw new Error(result.message);
}