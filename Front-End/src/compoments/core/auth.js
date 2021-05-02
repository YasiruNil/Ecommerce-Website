
const isAuth = () => {
    if(typeof window == "undefined"){
        return false
    }
    if(localStorage.getItem("JWTtoken")){
        return JSON.parse(localStorage.getItem("JWTtoken"))
    }else{
        return false
    }
}

export { isAuth }