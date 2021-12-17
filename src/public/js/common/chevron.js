const chevron_up = document.getElementById('main__list-chevron-up')
const chevron_down = document.getElementById('main__list-chevron-down')
const main_list = document.getElementById("main_list")
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

function toggleChevron(){
    chevron_down.addEventListener("click", handleChevronDown)
    chevron_up.addEventListener("click", handleChevronUp)

}
toggleChevron()
