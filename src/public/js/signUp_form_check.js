const form = document.getElementById('signUp-form')
const email = document.getElementsByName('userEmail')
const userNick = document.getElementsByName('userNick')
const userPw = document.getElementsByName('userPw')

function checkInputLength(){
    console.log(email)
}

form.addEventListener("submit",function(e){
    e.preventDefault()
    console.log(email)
})