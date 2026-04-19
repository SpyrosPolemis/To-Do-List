import listController from "./listController.js";
import listIcon from "./assets/menu.svg"

const sidebarContent = document.querySelector("#sidebar-content");
const centreWindow = document.querySelector("#centre-window")
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
        const centreContent = document.querySelector("#tasks") 
        centreHeading.textContent = list.name
        list.tasks.forEach(task => {
            const taskDiv = document.createElement("div")
            taskDiv.textContent = "Task 1" // TODO: Implement Tasks
            centreContent.append(taskDiv)
        });
    }
}

export default uiController


