import "./styles.css"
import listController from "./listController.js"
import uiController from "./uiController.js"

console.log("Working! Yipeeee!")

const createListBtn = document.querySelector("#sidebar-header");
const sidebarContent = document.querySelector("#sidebar-content");
createListBtn.addEventListener("click", () => {
    uiController.showAddListModal()
})

const listForm = document.querySelector("#list-form")
listForm.addEventListener("submit", () => {
    const listNameField = document.querySelector("#list-name")
    const newList = listController.createList(listNameField.value)  
    uiController.updateLists()
    uiController.focusList(newList) 
    listForm.reset()
})

const allTasks = document.querySelector("#all-tasks")
allTasks.classList.add("active-list")
allTasks.addEventListener("click", () => {
    uiController.focusList(listController.getMasterList())
})

function loadPage() {
    const exampleList = listController.createList("Welcome!")
    exampleList.addTask("Example Task")
    uiController.focusList(listController.getMasterList())
    uiController.updateLists()
}
loadPage()

const sortButton = document.querySelector("#sort-button")
sortButton.addEventListener("click", (e) => {
    e.stopPropagation()
    uiController.showSortMenu()
})

const sortOptions = document.querySelectorAll(".sort-option")
sortOptions.forEach((option) => {
    option.addEventListener("click", (e) => {
        let sortingFunc = null;
        if (e.target.id === "sort-created-btn") {
            sortingFunc = function(a, b) {
                return b.dateCreated - a.dateCreated 
            }
        } else if (e.target.id === "sort-due-btn") {
            sortingFunc = function(a, b) {
                return b.dateDue - a.dateDue 
            }
        } else {
            sortingFunc = function(a, b) {
                return b.priority - a.priority 
            }   
        }
        uiController.getActiveList().sortList(sortingFunc)
        uiController.updateTasks(uiController.getActiveList()) 
    })
})