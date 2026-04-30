import listController from "./listController.js";
import listIcon from "./assets/menu.svg"
import checkedIcon from "./assets/blackChecked.svg"
import uncheckedIcon from "./assets/blackUnchecked.svg"
import binIcon from "./assets/bin.svg"


const sidebarContent = document.querySelector("#sidebar-content");
const taskInputSection = document.querySelector("#task-input")
const centreContent = document.querySelector("#tasks") 
const completedTasksSection = document.querySelector("#completed-tasks")
const completedTasks = document.querySelector("#completed-tasks-content")
const incompleteTasks = document.querySelector("#incomplete-tasks-content")
const centreHeading = document.querySelector("#centre-header")
const listHeader = document.querySelector("#list-header")
const taskHeader = document.querySelector("#task-header")
const taskHeaderBottom = document.querySelector("#task-header-bottom")
const taskHeaderTop = document.querySelector("#task-header-top")
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
            const newTask = list.addTask(taskInputField.value)
            taskInputField.innerHTML = ""
            focusedTaskID = newTask.ID
            updateTasks(list)
            focusTask(newTask)
            taskInputField.value = ""
        }
    }
    taskInputSection.append(taskInputField, taskInputSubmit)
}


// Found out about this method of using SVG's through AI
const unchecked = await fetch(uncheckedIcon)
const uncheckedText = await unchecked.text()

const checked = await fetch(checkedIcon)
const checkedText = await checked.text()


let focusedTaskID;
function updateTasks(list) {
    completedTasks.innerHTML = ""
    incompleteTasks.innerHTML = ""
    list.tasks.forEach(task => {
        const iconDiv = document.createElement("div")
        const taskDiv = document.createElement("div")        
        iconDiv.classList.add("no-select", "clickable")
        const taskName = document.createElement("div")
        // Set checked/unchecked
        if (!task.completed) {
            iconDiv.innerHTML = uncheckedText
        } else {
            iconDiv.innerHTML = checkedText
        }
        // Set colour
        if (task.priority === "None") {
            iconDiv.classList.add("noPriority")
        } else if (task.priority === "Low") {
            iconDiv.classList.add("lowPriority")
        } else if (task.priority === "Medium") {
            iconDiv.classList.add("mediumPriority")
        } else if (task.priority === "High") {
            iconDiv.classList.add("highPriority")
        } else {
            iconDiv.style.fill = "#d61f1f"
        }
        iconDiv.addEventListener("click", (e) => {
            e.stopPropagation()
            if(task.completed) {
                task.markIncomplete()
                iconDiv.innerHTML = uncheckedText
            } else {
                task.markComplete()
                iconDiv.innerHTML = checkedText
                
            }
            updateTasks(list)
        })
        taskName.textContent = task.name
        taskDiv.append(iconDiv, taskName)
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
    taskHeaderTop.innerHTML = ""
    const taskHeaderTopText = document.createElement("div")
    taskHeaderTopText.textContent = taskToFocus.name
    taskHeaderTop.append(taskHeaderTopText)

    const bin = document.createElement("img")
    bin.src = binIcon
    bin.onclick = () => {
        const taskList = listController.getLists()[listController.getLists().findIndex(list => list.ID === taskToFocus.listID)]
        console.log("We are deleting from", taskList)
        taskList.deleteTask(taskToFocus)
        taskHeaderTop.innerHTML = ""
        taskHeaderBottom.innerHTML = ""
        taskContent.innerHTML = ""
        focusedTaskID = ""
        if (activeList === listController.getMasterList()) {
            updateTasks(listController.getMasterList())
        } else {
            updateTasks(taskList)
        }
    }
    taskHeaderTop.append(bin)
    taskHeaderBottom.innerHTML = ""
    const prioritySetter = createPrioritySetter(taskToFocus)
    taskHeaderBottom.append(prioritySetter)
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

function createPrioritySetter(task) {
    const prioritySetterDiv = document.createElement("div")
    const priorityLabel = document.createElement("label")
    priorityLabel.for = "priority"
    priorityLabel.textContent = "Priority:"
    const prioritySelect = document.createElement("select")
    // no prio
    const noPriority = new Option("None")
    noPriority.classList.add("noPriority", "priority-option")
    prioritySelect.add(noPriority)
    // low prio
    const lowPriority = new Option("Low")
    lowPriority.classList.add("lowPriority", "priority-option")
    prioritySelect.add(lowPriority)
    // mid prio
    const mediumPriority = new Option("Medium")
    mediumPriority.classList.add("mediumPriority", "priority-option")
    prioritySelect.add(mediumPriority)
    // high prio
    const highPriority = new Option("High")
    highPriority.classList.add("highPriority", "priority-option")
    prioritySelect.add(highPriority)
    switch (task.priority) {
        case "Low":
            prioritySelect.value = "Low"
            break
        case "Medium":
            prioritySelect.value = "Medium"
            break
        case "High":
            prioritySelect.value = "High"
            break
        default:
            prioritySelect.value = "None"
    }
    prioritySelect.addEventListener("change", () => {
        task.setPriority(prioritySelect.value)
        updateTasks(listController.getLists()[listController.getLists().findIndex(list => list.ID === task.listID)])
    })
    prioritySetterDiv.append(priorityLabel, prioritySelect)
    prioritySetterDiv.style.display = "flex"
    prioritySetterDiv.style.gap = "8px"
    return prioritySetterDiv
}

const listConfigSect = document.querySelector("#list-config")
const listConfigBtn = document.querySelector("#list-config-btn")
const listConfigMenu = document.querySelector("#list-config-menu")

const showCompleteBtn = document.querySelector("#show-completed-btn")
showCompleteBtn.onclick = toggleCompleted
function toggleCompleted() {
    completedTasksSection.classList.toggle("hide")
}

const deleteListBtn = document.querySelector("#delete-list-btn")

deleteListBtn.addEventListener("click", () => {
    if (activeList != "") {
        listController.deleteList(activeList.ID)
        allTasks.classList.add("active-list")
        taskHeaderTop.innerHTML = ""
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
