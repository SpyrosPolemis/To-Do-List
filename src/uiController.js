import listController from "./listController.js";
import listIcon from "./assets/menu.svg"

const sidebarContent = document.querySelector("#sidebar-content");
// const centreWindow = document.querySelector("#centre-window")
const taskInputSection = document.querySelector("#task-input")
const centreContent = document.querySelector("#tasks") 
const centreHeading = document.querySelector("#centre-header")

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
                this.focusList(lists[i].ID)
            } ;
            sidebarContent.append(listDiv);
        }
    },
    showAddListModal() {
        const AddListModal = document.querySelector("#newListDialog")        
        AddListModal.show()
    },
    focusList(listToFocus) {
        const lists = listController.getLists()
        const list = lists.find(list => list.ID === listToFocus)
        centreContent.innerHTML = ""
        centreHeading.textContent = list.name
        taskInputSection.innerHTML = ""
        createTaskInput(list)
        list.tasks.forEach(task => {
            const taskDiv = document.createElement("div")
            taskDiv.classList.add("task")
            taskDiv.textContent = task.name
            centreContent.append(taskDiv)
        });
    }
}

function createTaskInput(list) {
    const taskInputField = document.createElement("input")
    const taskInputSubmit = document.createElement("button")
    taskInputField.classList.add("task-input-field")
    taskInputSubmit.textContent = "Add task"
    taskInputSubmit.onclick = () => {
        list.addTask(taskInputField.value)
        centreContent.innerHTML = ""
        list.tasks.forEach(task => {
            const taskDiv = document.createElement("div")
            taskDiv.textContent = task.name
            taskDiv.classList.add("task")
            centreContent.append(taskDiv)
            console.log(task)
        });
        taskInputField.value = ""
    }
    taskInputSection.append(taskInputField, taskInputSubmit)
}

export default uiController
