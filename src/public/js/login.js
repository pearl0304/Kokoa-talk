const loginForm = document.querySelector("#login-form")
const emailInput = document.querySelector("#userEmail")
const pwInput = document.querySelector("#userPw")

function checkSpecial(string) { 
    var regExp = /[`~!#$%^&*|\\\'\";:\/?]/gim;
    if(regExp.test(string)) {
        return 'SPECIAL'; 
    }else{
        return string; 
    }
}

function removeEmojis (string) {
    var regex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff] |[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c [\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a] |\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f |\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab] |\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04 |[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a |\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934 |\u2935|[\u2190-\u21ff] |[\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g;
    var test = regex.test(string)
    if(test){
        return 'EMOJI'
    }else {
        return string
    }
}

function checkPassLength(password){
    if (password.length < 4){
        return 'PASS-LESS'
    }else if (password.length > 12){
        return 'PASS-MORE'
    }
}

function handleLoginForm(e){
    e.preventDefualt()
    let emailResult = checkSpecial(emailInput.value)
    let passwordResult = removeEmojis(pwInput.value)
    let pwLengthResult = checkPassLength(pwInput.value)


    if(emailResult == 'SPECIAL'){
        alert ('Special characters could not be used in email')
        emailInput.value = ''
        return false
    }


    else if(passwordResult == 'EMOJI') {
        alert('Emoji could not be used as a password')
        pwInput.value = ''
        return false
    }

    else if(pwLengthResult == 'PASS-LESS'){
        alert('Please enter a nickname with at least four letters')
        pwInput.value = ''
        return false
    }
    else if (pwLengthResult == 'PASS-MORE'){
        alert ('The nickname could not be more than 12 letters')
        pwInput.value = ''
        return false
    }
    else {
        loginForm.submit()
    }

}
