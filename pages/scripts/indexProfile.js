/* Desenvolva sua lógica aqui...*/

const valueUser = JSON.parse(localStorage.getItem("UserSearch"))

const baseURL = "https://api.github.com/users"

export async function getDetails(user){
    const userDetails = await
    getDatas(`${baseURL}/${user}`)
    const repositories = await getDatas(`${baseURL}/${user}/repos`)

function header(img, name, stack){
    return `
    <header> 
        <div class= profile-desc> 
            <img src="${img}" alt="">
            <div class="name-desc"> 
                <h3>${name}</h3>
                <cite> ${stack}</cite>
            </div>
        </div>
        <div class="buttons"> 
        <a href="mailto:${userDetails.email}"><button class="email">Email</button></a> 
            <a href="../../index.html"><button class="change-user">Trocar usuário</button></a>
        </div>
    </header>
    `
}

function repositoryCards(title, description, link1, link2){
    return `
    <li class="card">
        <h3 class="title">${title}</h3>
        <p class="description">${description}</p>
    <div class="link-buttons">
        <a href="${link1}" target="_blank"><button class="repository">Repositorio</button></a>
        <a href="${link2}"target="_blank"><button class="demo"> Perfil</button></a>
    </div>
    </li>   
    `
}



const main = document.querySelector("main")
main.insertAdjacentHTML("afterbegin", 
`
${header(userDetails.avatar_url, userDetails.name, userDetails.bio)}
<ul class="card-list">
${repositories.map((repository) => {
    return repositoryCards(repository.name, repository.description, repository.html_url, userDetails.html_url)
})}
</ul>
`)
}

valueUser.length == 1 ? getDetails(valueUser[0]) : valueUser.length == 2 ?getDetails(valueUser[1]) : getDetails(valueUser[2])
