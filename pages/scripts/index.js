/* Desenvolva sua lógica aqui...*/

const buttonPerfil = document.querySelector(".form .button-search")

let userInputValue = []

const baseURL2 = "https://api.github.com/users"

let storageArray = JSON.parse(localStorage.getItem("UserSearch"))


function addItem(){
    buttonPerfil.addEventListener("click", ()=> {

        let userInput = document.getElementById("user").value  
         fetch(`https://api.github.com/users/${userInput}`)
         .then(res => {
            buttonPerfil.innerText = "Ver perfil do github"
            if(res.ok){
                if(localStorage.UserSearch){
                    userInputValue = JSON.parse(localStorage.getItem('UserSearch'))
                }
            
                if(userInputValue.length == 3){
                    userInputValue.shift()
                }
            
                userInputValue.push(userInput)
            
                document.getElementById("user").value = "";
            
                localStorage.UserSearch = JSON.stringify(userInputValue)
                window.location.assign("pages/profile/index-profile.html")
            }else{
                const span = document.querySelector(".error")
                span.innerText = "Usuario não encontrado"
            }
         })
    
         buttonPerfil.innerHTML = `<div class="loader">Loading...</div>`
    })

}

addItem()


   let inputCamp = document.querySelector("#user")
   inputCamp.addEventListener("input", buttonDisable);
   function buttonDisable(){
    if(document.querySelector("#user").value == ""){
        buttonPerfil.disabled = true
        buttonPerfil.style.opacity = "0.5"
        buttonPerfil.style.cursor = "default"
    }else{
        buttonPerfil.disabled = false
        buttonPerfil.style.opacity = "1"
        buttonPerfil.style.cursor = "pointer"
    }
   }


async function searchRecents(){
    const recentList = document.querySelector(".recent-list")
    if(storageArray != null){
        storageArray.reverse()
    storageArray.forEach(async element => {
        const userDetails = await getDatas(`${baseURL2}/${element}`)
        recentList.insertAdjacentHTML("beforeend", `
            <li class="recent-user">
                <img class="user-img" id="${userDetails.id}" src="${userDetails.avatar_url}" alt="">
                <button class="acess-user" id="${userDetails.login}"> Acessar user</button>
            </li>

        `) 
    });
}
}

searchRecents()

setTimeout( () => {
    const buttonRecent = document.querySelectorAll(".acess-user")
    buttonRecent.forEach((button) => {
        button.addEventListener("click", ()=>{
            storageArray.forEach(async (element) => {
                const userDetails = await getDatas(`${baseURL2}/${element}`)
                if(button.id == userDetails.login){
                    const index = storageArray.findIndex((ele) => ele.toLowerCase() == button.id.toLowerCase())
                    storageArray.splice(index,1)
                    storageArray.push(userDetails.login)
                    localStorage.UserSearch = JSON.stringify(storageArray)
                    window.location.assign("pages/profile/index-profile.html")
                }
                
            })
        })
    })
},1000)
