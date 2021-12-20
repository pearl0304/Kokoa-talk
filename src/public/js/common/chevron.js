const chevron_up = document.getElementById('main__list-chevron-up')
const chevron_down = document.getElementById('main__list-chevron-down')
const main_list = document.getElementById("main_list")
const friends_chevron_up = document.getElementById('friends__list-chevron-up')
const friends_chevron_down = document.getElementById('friends__list-chevron-down')
const friends_list_wrap = document.getElementById("friends_list_wrap")
const HIDDEN_CLASSNAME = "hidden"

function handleChevron(){
    chevron_up.classList.toggle(HIDDEN_CLASSNAME)
    chevron_down.classList.toggle(HIDDEN_CLASSNAME)
    main_list.classList.toggle(HIDDEN_CLASSNAME)
}

function handleFriendListChevron(){
    friends_chevron_up.classList.toggle(HIDDEN_CLASSNAME)
    friends_chevron_down.classList.toggle(HIDDEN_CLASSNAME)
    friends_list_wrap.classList.toggle(HIDDEN_CLASSNAME)
}

function toggleChevron(){
    chevron_down.addEventListener("click",handleChevron)
    chevron_up.addEventListener("click",handleChevron)
    friends_chevron_down.addEventListener("click",handleFriendListChevron)
    friends_chevron_up.addEventListener("click",handleFriendListChevron)

}
toggleChevron()
