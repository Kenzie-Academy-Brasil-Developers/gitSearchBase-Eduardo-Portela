/* Desenvolva sua lógica aqui...*/
//import {getDetails} from "./indexProfile.js"

const buttonPerfil = document.querySelector(".form .button-search")

let userInputValue = []

const baseURL2 = "https://api.github.com/users"

let storageArray = JSON.parse(localStorage.getItem("UserSearch"))


function addItem(){
    let userInput = document.getElementById("user").value  
    // console.log(getDatas(`https://api.github.com/users/${storageArray[2]}`))
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

}


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
    storageArray.reverse()
    storageArray.forEach(async element => {
        const userDetails = await getDatas(`${baseURL2}/${element}`)
        recentList.insertAdjacentHTML("beforeend", `
            <li class="recent-user">
                <img class="user-img" id="${userDetails.id}" src="${userDetails.avatar_url}" alt="">
                <button class="acess-user" id="${userDetails.id}"> Acessar user</button>
            </li>

        `)
    });
}

searchRecents()




















// setTimeout(async ()=> {
    
//     const acessUser = [...document.querySelectorAll(".user-img")]
//     const acesslink = document.querySelectorAll(".acess-user")

//     acessUser.forEach(async(user)=>{
//         //const userDetails = await getDatas(`${baseURL2}/${user}`)
//         user.addEventListener("click", () => {
//             acesslink.forEach((link) => {
//                     if(link.id == user.id){
//                         link.classList.toggle("show")   
//                     }
//             })

//         })
//     })


// }, 1000)
