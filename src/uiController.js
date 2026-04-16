import listController from "./listController.js";
import listIcon from "./assets/menu.svg"

const sidebarContent = document.querySelector("#sidebar-content");
const centreWindow = document.querySelector("#centre-window")

const uiController = {
    updateLists() {
        sidebarContent.innerHTML = ""
        const lists =  listController.getListNames()
        for (let i = 0; i < lists.length; i++) {
            const listDiv = document.createElement("div");
            const icon = document.createElement("img");
            icon.src = listIcon;
            icon.draggable = false;
            listDiv.append(icon, lists[i]);
            listDiv.classList.add("list-entry", "no-select");
            sidebarContent.append(listDiv);
        }
    },
    showAddListModal() {
        const AddListModal = document.querySelector("#newListDialog")        
        AddListModal.show()
    }
}

export default uiController


