/* Desenvolva sua lógica aqui...*/

const buttonPerfil = document.querySelector(".form .button-search")

async function getDatas(url){
    // const buttonDefault = document.querySelector(".form .button-search")
      try{
      const data = await fetch(url)
    
      console.log(data)
      
        if(data.status == 404){
  
          throw new Error("Deu Errado!")
          
  
        }
        const dataJson = await data.json()
  
      return dataJson;

      }catch(error){  
        const span = document.querySelector(".error")
        span.innerText = "Usuario não encontrado"
        console.log("USUARIO NÂO ENCONTRADO 2")
      }
      buttonPerfil.innerText = `Ver perfil do github`
  }




let userInputValue = []

let userInput = ""



const baseURL2 = "https://api.github.com/users"

let storageArray = JSON.parse(localStorage.getItem("UserSearch"))


function addItem(){
    // console.log(getDatas(`https://api.github.com/users/${storageArray[2]}`))
        
        buttonPerfil.innerHTML = `<div class="loader">Loading...</div>`

        if(localStorage.UserSearch){
        userInputValue = JSON.parse(localStorage.getItem('UserSearch'))
    }
    
    userInput = document.getElementById("user").value

    //aqui tava fazendo teste
    setTimeout(getDatas(`https://api.github.com/users/${userInput}`))
  
    

    if(userInputValue.length == 3){
        userInputValue.shift()
    }

    userInputValue.push(userInput)

    document.getElementById("user").value = "";

    localStorage.UserSearch = JSON.stringify(userInputValue)
//Aqui muda de pagina
   //window.location.assign("pages/profile/index-profile.html")

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





// async function searchRecents(){
//     const recentList = document.querySelector(".recent-list")
//     storageArray.reverse()
//     storageArray.forEach(async element => {
//         const userDetails = await getDatas(`${baseURL2}/${element}`)
//         recentList.insertAdjacentHTML("beforeend", `
//             <li class="recent-user">
//                 <img class="user-img" id="${userDetails.id}" src="${userDetails.avatar_url}" alt="">
//                 <a class="acess-user show" id="${userDetails.id}" href="">Acessar user</a>
//             </li>

//         `)
//     });
// }

// searchRecents()

setTimeout(async ()=> {
    
    const acessUser = [...document.querySelectorAll(".user-img")]
    const acesslink = document.querySelectorAll(".acess-user")

    acessUser.forEach(async(user)=>{
        //const userDetails = await getDatas(`${baseURL2}/${user}`)
        user.addEventListener("click", () => {
            acesslink.forEach((link) => {
                    if(link.id == user.id){
                        link.classList.toggle("show")   
                    }
            })

        })
    })


}, 1000)



