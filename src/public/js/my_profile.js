const editBtn = document.getElementById('profile__edit-btn')
const profileImgBtn = document.getElementById('profile-img-btn')
const statusMessage = document.getElementById('status-message')
const HIDDEN ='hidden'

function showEdit(){
    profileImgBtn.classList.toggle(HIDDEN)
    statusMessage.classList.toggle(HIDDEN)
}

function clickEdit(){
    editBtn.addEventListener("click",showEdit)
}

clickEdit()