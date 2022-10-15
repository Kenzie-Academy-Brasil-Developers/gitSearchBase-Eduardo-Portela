async function getDatas(url){
  // const buttonDefault = document.querySelector(".form .button-search")
    try{
    const data = await fetch(url)
    const dataJson = await data.json()
    return dataJson;

    }catch(error){  
      console.log("USUARIO NÂO ENCONTRADO")
    }
}
