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
    listController.createList(listNameField.value)    
    uiController.updateLists()
    listForm.reset()
})