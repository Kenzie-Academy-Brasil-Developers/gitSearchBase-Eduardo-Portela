async function getDatas(url){
  // const buttonDefault = document.querySelector(".form .button-search")
    try{
    const data = await fetch(url)
    const dataJson = await data.json()
    return dataJson;

    }catch(error){  
      const span = document.querySelector(".error")
      span.innerText = "Usuario não encontrado"
      console.log("USUARIO NÂO ENCONTRADO 2")
    }
    buttonPerfil.innerText = `Ver perfil do github`
}