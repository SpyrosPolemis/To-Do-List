import listController from "./listController.js";
import listIcon from "./assets/menu.svg"
import checkedIcon from "./assets/blackChecked.svg"
import uncheckedIcon from "./assets/blackUnchecked.svg"
import binIcon from "./assets/bin.svg"


const sidebarContent = document.querySelector("#sidebar-content");
const taskInputSection = document.querySelector("#task-input")
const centreContent = document.querySelector("#tasks") 
const completedTasks = document.querySelector("#completed-tasks-content")
const incompleteTasks = document.querySelector("#incomplete-tasks-content")
const centreHeading = document.querySelector("#centre-header")
const listHeader = document.querySelector("#list-header")
const taskHeader = document.querySelector("#task-header")
const taskContent = document.querySelector("#task-content")

let activeList = "" // List object

const uiController = {
    updateLists() {
        sidebarContent.innerHTML = ""
        const lists =  listController.getLists()
        lists.filter(list => list.ID !== listController.getMasterList().ID).forEach(list => {
            const listDiv = document.createElement("div");
            const icon = document.createElement("img");
            icon.src = listIcon;
            icon.draggable = false;
            listDiv.id = "id-" + list.ID
            listDiv.append(icon, list.name);
            listDiv.classList.add("list-entry", "no-select");
            listDiv.addEventListener("click", () => {
                this.focusList(list)
                highlightHelper(sidebarContent, listDiv)
            })
            sidebarContent.append(listDiv);
        })
    },
    showAddListModal() {
        const AddListModal = document.querySelector("#newListDialog")        
        AddListModal.show()
    },
    focusList(listToFocus) {
        const lists = listController.getLists()
        if (listToFocus !== listController.getMasterList()) {
            const focusedList = document.querySelector(`#id-${listToFocus.ID}`)
            allTasks.classList.remove("active-list")
            focusedList.classList.add("active-list")
            deleteListBtn.style.display = "block"
        } else {
            deleteListBtn.style.display = "none"
        }
        taskInputSection.innerHTML = ""
        listHeader.textContent = listToFocus.name
        taskInputSection.innerHTML = ""
        activeList = listToFocus
        createTaskInput(listToFocus)
        updateTasks(listToFocus)
    }
}

function highlightHelper(sidebarContent, listDiv) {
    sidebarContent.querySelectorAll(".list-entry").forEach(l => l.classList.remove("active-list"))
    listDiv.classList.add("active-list")
    allTasks.classList.remove("active-list")
}

const allTasks = document.querySelector("#all-tasks")
allTasks.addEventListener("click", () => {
    sidebarContent.querySelectorAll(".list-entry").forEach(l => l.classList.remove("active-list"))
    allTasks.classList.add("active-list")
})

function createTaskInput(list) {
    const taskInputField = document.createElement("input")
    const taskInputSubmit = document.createElement("button")
    taskInputField.classList.add("task-input-field")
    taskInputSubmit.textContent = "Add task"
    taskInputSubmit.onclick = () => {
        if (taskInputField.value.length > 0) {
            list.addTask(taskInputField.value)
            taskInputField.innerHTML = ""
            updateTasks(list)
            taskInputField.value = ""
        }
    }
    taskInputSection.append(taskInputField, taskInputSubmit)
}


let focusedTaskID;
function updateTasks(list) {
    completedTasks.innerHTML = ""
    incompleteTasks.innerHTML = ""
    list.tasks.forEach(task => {
        const taskDiv = document.createElement("div")
        const checkTask = document.createElement("img")
        checkTask.classList.add("no-select")
        const taskName = document.createElement("div")
        if (!task.completed) {
            checkTask.src = uncheckedIcon
        } else {
            checkTask.src = checkedIcon
        }
        checkTask.addEventListener("click", (e) => {
            e.stopPropagation()
            if(task.completed) {
                task.markIncomplete()
                checkTask.src = uncheckedIcon
                
            } else {
                task.markComplete()
                checkTask.src = checkedIcon
                
            }
            updateTasks(list)
        })
        taskName.textContent = task.name
        taskDiv.append(checkTask, taskName)
        taskDiv.classList.add("task")
        if (task.ID === focusedTaskID) {
            taskDiv.classList.add("focused-task")
        }
        taskDiv.onclick = () => {
            focusTask(task)
            completedTasks.querySelectorAll(".task").forEach((t) => {
                t.classList.remove("focused-task")
            })
            incompleteTasks.querySelectorAll(".task").forEach((t) => {
                t.classList.remove("focused-task")
            })
            taskDiv.classList.add("focused-task")
            focusedTaskID = task.ID
        }
        if (task.completed) {
            taskDiv.classList.add("completed")
            taskName.classList.add("completed")
            completedTasks.append(taskDiv)
        } else {
            incompleteTasks.append(taskDiv)
            taskDiv.classList.remove("completed")
            taskName.classList.remove("completed")
        }
    });
}

function focusTask(taskToFocus) {
    // render heading   
    taskHeader.innerHTML = ""
    const taskHeaderText = document.createElement("div")
    taskHeaderText.textContent = taskToFocus.name
    taskHeader.append(taskHeaderText)

    const bin = document.createElement("img")
    bin.src = binIcon
    bin.onclick = () => {
        const taskList = listController.getLists()[listController.getLists().findIndex(list => list.ID === taskToFocus.listID)]
        taskList.deleteTask(taskToFocus)
        taskHeader.innerHTML = ""
        taskContent.innerHTML = ""
        focusedTaskID = ""
        updateTasks(taskList)
    }
    taskHeader.append(bin)
    // render body
    taskContent.innerHTML = ""
    const taskText = document.createElement("textarea")
    taskText.addEventListener("input", () => {
        taskToFocus.description = taskText.value
    })
    taskText.placeholder = "Edit task description"
    taskContent.append(taskText)
    taskText.focus()
    taskText.textContent = taskToFocus.description
}

const listConfigSect = document.querySelector("#list-config")
const listConfigBtn = document.querySelector("#list-config-btn")
const listConfigMenu = document.querySelector("#list-config-menu")

const showCompleteBtn = document.querySelector("#show-completed-btn")
const deleteListBtn = document.querySelector("#delete-list-btn")

deleteListBtn.addEventListener("click", () => {
    if (activeList != "") {
        listController.deleteList(activeList.ID)
        allTasks.classList.add("active-list")
        taskHeader.innerHTML = ""
        taskContent.innerHTML = ""
        focusedTaskID = ""
        uiController.updateLists()
        uiController.focusList(listController.getMasterList())
    }
})

listConfigBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    listConfigMenu.classList.toggle('open');
})

document.addEventListener("click", () => {
    listConfigMenu.classList.remove("open")
})



export default uiController
