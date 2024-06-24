/*const USER = {  //busca usuario
    login: String,  //login tipo string
    name: String,
    bio: String,
    avatar_url: String,
    public_repos: Number,
    followers: Number,
    following: Number,
    repos: Array,
}
const QUERY = document.querySelector(".query");  //busca essa classe

async function getUser() {
    getRepos();
    const URL = `https://api.github.com/users/${QUERY.value}`;  //busca na url na api 
    const DATA = await fetch(URL);  //espere terminar a requisição e busque a url, informação
    const USER_DATA = await DATA.json();  //user_data espera dados em formato json, e salva no usuario

    if (USER_DATA.message === "Not found") {  //verifica se usuario existe
        alert("User not found");
        return;  //caso usuario não existe
    }
    USER.login = USER_DATA.login;  
    USER.name = USER_DATA.name;
    USER.bio = USER_DATA.bio;
    USER.avatar_url = USER_DATA.avatar_url;
    USER.public_repos = USER_DATA.public_repos;
    USER.followers = USER_DATA.followers;
    USER.following = USER_DATA.following;  //monta usuario caso exista

    getAllData();
}
async function getRepos() {  //busca repositórios  //const só existe dentro do bloco, não imprime fora
    const URL = `https://api.github.com/users/${QUERY.value}/  
    repos`;
    const DATA = await fetch(URL);
    const REPOS = await DATA.json();  //esperar retorno dos dados em json

    USER.repos = REPOS;
}
function getAllData() {
    const USER_INFO = document.getElementById("user-info");
    USER_INFO.setAttribute("style", "display:block");

    //retorna objeto em forma de url
    USER_INFO.innerHTML = `  
    <div class="user-info">
    <div class="user-avatar">
    <h2 class="user-name">${USER.name == null ? USER.name = "No username" : USER.name}</h2>  // : é o caso falso, sem username
    <h3 class="user-login">${USER.login}</h3>
    <img class="avatar_img" src="${USER.avatar_url}" alt="${USER.login}">
    <p class="bio">${USER.bio == null ? (USER.bio = "No bio") : USER.bio}</p>
    </div>
    <div class="user-stats">
    <h2>Info</h2>
    <p>Repos: ${USER.public_repos}</p>
    <p>Followers: ${USER.followers}</p>
    <p>Following: ${USER.following}</p>
    </div>
    </div>
    ${USER.repos.map((repo) => `<div class="repo">
    <h3 class="repo-name">${repo.name}</h3>
    <p class="repo-description">${repo.description == null ? (repo.description = "No description") : repo.description}</p>
    <p class="repo-language">${repo.language == null ? repo.language = "No language found" : repo.language}</p>
    <div class="repo-stats">
    <span>⭐${repo.stargazers_count}</span>
    <span>💬${repo.watchers_count}</span>
    <span>📦${repo.forks_count}</span>
    <span>📅${new Date(repo.update_at).toLocaleDateString('pt-br')}</span>
    </div>
    <a href="${repo.html_url}" target="_blank"></a>
    <span>🔗${repo.html_url}</span>
    </div>`).join("")} //tirou vírguls que separavam repositórios
    `;
}*/

const USER = {
    login: "",
    name: "",
    bio: "",
    avatar_url: "",
    public_repos: 0,
    followers: 0,
    following: 0,
    repos: []
};

const QUERY = document.querySelector(".query");

async function getUser() {
    await getRepos(); // Espera pela função getRepos()

    const URL = `https://api.github.com/users/${QUERY.value}`;
    const DATA = await fetch(URL);
    const USER_DATA = await DATA.json();

    if (USER_DATA.message === "Not Found") {
        alert("User not found");
        return;
    }

    USER.login = USER_DATA.login || "No username";
    USER.name = USER_DATA.name || "No name";
    USER.bio = USER_DATA.bio || "No bio";
    USER.avatar_url = USER_DATA.avatar_url;
    USER.public_repos = USER_DATA.public_repos;
    USER.followers = USER_DATA.followers;
    USER.following = USER_DATA.following;

    getAllData();
}

async function getRepos() {
    const URL = `https://api.github.com/users/${QUERY.value}/repos`;
    const DATA = await fetch(URL);
    USER.repos = await DATA.json();
}

function getAllData() {
    const USER_INFO = document.getElementById("user-info");
    USER_INFO.setAttribute("style", "display:block");

    USER_INFO.innerHTML = `
    <div class="user-info">
        <div class="user-avatar">
            <h2 class="user-name">${USER.name}</h2>
            <h3 class="user-login">${USER.login}</h3>
            <img class="avatar_img" src="${USER.avatar_url}" alt="${USER.login}">
            <p class="bio">${USER.bio}</p>
        </div>
        <div class="user-stats">
            <h2>Info</h2>
            <p>Repos: ${USER.public_repos}</p>
            <p>Followers: ${USER.followers}</p>
            <p>Following: ${USER.following}</p>
        </div>
    </div>
    ${USER.repos.map(repo => `
        <div class="repo">
            <h3 class="repo-name">${repo.name}</h3>
            <p class="repo-description">${repo.description || "No description"}</p>
            <p class="repo-language">${repo.language || "No language found"}</p>
            <div class="repo-stats">
                <span>⭐${repo.stargazers_count}</span>
                <span>💬${repo.watchers_count}</span>
                <span>📦${repo.forks_count}</span>
                <span>📅${new Date(repo.updated_at).toLocaleDateString('pt-br')}</span>
            </div>
            <a href="${repo.html_url}" target="_blank">Link do Repositório</a>
            <span>🔗${repo.html_url}</span>
        </div>`).join("")}
    `;
}



