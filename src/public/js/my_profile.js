const editBtn = document.getElementById('profile__edit-btn')
const originUserNick = document.getElementById('origin-userNick')
const originStatusMessage = document.getElementById('origin-statusMessage')
const profileImgBtn = document.querySelector('.profile-profileImg #profile-img-btn')
const profileEdit = document.getElementById('profile-edit')
const profileEditBtn = document.getElementById('profile-edit-btn')
const HIDDEN_CLASSNAME ='hidden'

// NOTE : nick-name status-message length check
const profileEditForm = document.getElementById('profile-edit-form')
const nickInput = document.getElementById('userNick') 
const statusInput = document.getElementById('statusMessage')

function showEdit(){
    originUserNick.classList.toggle(HIDDEN_CLASSNAME)
    originStatusMessage.classList.toggle(HIDDEN_CLASSNAME)
    profileImgBtn.classList.toggle(HIDDEN_CLASSNAME)
    profileEdit.classList.toggle(HIDDEN_CLASSNAME)
    profileEditBtn.classList.toggle(HIDDEN_CLASSNAME)

}

function clickEdit(){
    editBtn.addEventListener("click",showEdit)
}

// NOTE : Check nick name length 
function checkNicknameLength(nick){
    if (nick.length < 2){
        return 'NICK-LESS'
    }else if (nick.length > 8){
        return 'NICK-MORE'
    }
}

// NOTE : status message length 
function checkStatusMessageLength(message){
    if (message.length > 60){
        return 'MESSAGE-MORE'
    }
}

function handleProfileForm(e){
    e.preventDefault()

    let nickLengthResult = checkNicknameLength(nickInput.value) 
    let statusLengthResult = checkNicknameLength(statusInput.value)

    if(nickLengthResult == 'NICK-LESS'){
        alert('Please enter a nickname with at least two letters')
        nickInput.value = ''
        return false
    }
    else if (nickLengthResult == 'NICK-MORE'){
        alert ('The nickname could not be more than 8 characers')
        nickInput.value = ''
        return false
    }
    else if (statusLengthResult == 'MESSAGE-MORE'){
        alert ('The status message could not be more than 60 characers')
        statusInput.value = ''
        return false
    }
    else {
        profileEditForm.submit()
    }

}


clickEdit()