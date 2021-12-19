const editBtn = document.getElementById('profile__edit-btn')
const profileImgBtn = document.getElementById('profile-img-btn')
const statusMessage = document.getElementById('status-message')
const HIDDEN_CLASSNAME ='hidden'

function showEdit(){
    profileImgBtn.classList.toggle(HIDDEN_CLASSNAME)
    statusMessage.classList.toggle(HIDDEN_CLASSNAME)
}

function clickEdit(){
    editBtn.addEventListener("click",showEdit)
}

clickEdit()