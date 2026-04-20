import listController from "./listController.js";
import listIcon from "./assets/menu.svg"

const sidebarContent = document.querySelector("#sidebar-content");
// const centreWindow = document.querySelector("#centre-window")
const taskInputSection = document.querySelector("#task-input")
const centreContent = document.querySelector("#tasks") 
const centreHeading = document.querySelector("#centre-header")
const taskHeader = document.querySelector("#task-header")
const taskContent = document.querySelector("#task-content")


const uiController = {
    updateLists() {
        sidebarContent.innerHTML = ""
        const lists =  listController.getLists()
        for (let i = 0; i < lists.length; i++) {
            const listDiv = document.createElement("div");
            const icon = document.createElement("img");
            icon.src = listIcon;
            icon.draggable = false;
            listDiv.append(icon, lists[i].name);
            listDiv.classList.add("list-entry", "no-select");
            listDiv.onclick = () => {
                focusList(lists[i].ID)
            } ;
            sidebarContent.append(listDiv);
        }
    },
    showAddListModal() {
        const AddListModal = document.querySelector("#newListDialog")        
        AddListModal.show()
    },
}

function focusList(listToFocus) {
    const lists = listController.getLists()
    const list = lists.find(list => list.ID === listToFocus)
    centreContent.innerHTML = ""
    centreHeading.textContent = list.name
    taskInputSection.innerHTML = ""
    createTaskInput(list)
    updateTasks(list)
}

function createTaskInput(list) {
    const taskInputField = document.createElement("input")
    const taskInputSubmit = document.createElement("button")
    taskInputField.classList.add("task-input-field")
    taskInputSubmit.textContent = "Add task"
    taskInputSubmit.onclick = () => {
        list.addTask(taskInputField.value)
        centreContent.innerHTML = ""
        updateTasks(list)
        taskInputField.value = ""
    }
    taskInputSection.append(taskInputField, taskInputSubmit)
}

function updateTasks(list) {
    list.tasks.forEach(task => {
        const taskDiv = document.createElement("div")
        taskDiv.textContent = task.name
        taskDiv.classList.add("task")
        taskDiv.onclick = () => {
            focusTask(task)
        }
        centreContent.append(taskDiv)
    });
}

function focusTask(taskToFocus) {
    taskHeader.textContent = taskToFocus.name
    taskContent.textContent = taskToFocus.description
}


export default uiController
