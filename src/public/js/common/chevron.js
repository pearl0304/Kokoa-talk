const chevron_up = document.getElementById('main__list-chevron-up')
const chevron_down = document.getElementById('main__list-chevron-down')
const main_list = document.getElementById("main_list")
const friends_chevron_up = document.getElementById('friends__list-chevron-up')
const friends_chevron_down = document.getElementById('friends__list-chevron-down')
const friends_list = document.getElementById("friends_list")
const HIDDEN_CLASSNAME = "hidden"

function handleChevronDown(){
    chevron_down.classList.add(HIDDEN_CLASSNAME)
    main_list.classList.add(HIDDEN_CLASSNAME)
    chevron_up.classList.remove(HIDDEN_CLASSNAME)
}

function handleChevronUp(){
    chevron_up.classList.add(HIDDEN_CLASSNAME)
    chevron_down.classList.remove(HIDDEN_CLASSNAME)
    main_list.classList.remove(HIDDEN_CLASSNAME)
}

function handleFriendsChevronDown(){
    friends_chevron_down.classList.add(HIDDEN_CLASSNAME)
    friends_list.classList.add(HIDDEN_CLASSNAME)
    friends_chevron_up.classList.remove(HIDDEN_CLASSNAME)
}

function handleFriendsChevronUp(){
    friends_chevron_up.classList.add(HIDDEN_CLASSNAME)
    friends_chevron_down.classList.remove(HIDDEN_CLASSNAME)
    friends_list.classList.remove(HIDDEN_CLASSNAME)
}



function toggleChevron(){
    chevron_down.addEventListener("click", handleChevronDown)
    chevron_up.addEventListener("click", handleChevronUp)
    friends_chevron_down.addEventListener("click", handleFriendsChevronDown)
    friends_chevron_up.addEventListener("click", handleFriendsChevronUp)

}
toggleChevron()
