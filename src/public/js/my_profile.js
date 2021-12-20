const editBtn = document.getElementById('profile__edit-btn')
const originUserNick = document.getElementById('origin-userNick')
const profileImgBtn = document.querySelector('.profile-profileImg #profile-img-btn')
const profileEdit = document.getElementById('profile-edit')
const profileEditBtn = document.getElementById('profile-edit-btn')

const HIDDEN_CLASSNAME ='hidden'

function showEdit(){
    originUserNick.classList.toggle(HIDDEN_CLASSNAME)
    profileImgBtn.classList.toggle(HIDDEN_CLASSNAME)
    profileEdit.classList.toggle(HIDDEN_CLASSNAME)
    profileEditBtn.classList.toggle(HIDDEN_CLASSNAME)

}

function clickEdit(){
    editBtn.addEventListener("click",showEdit)
}

clickEdit()