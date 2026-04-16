import "./styles.css"
import listController from "./listController.js"
import uiController from "./uiController.js"

console.log("Working! Yipeeee!")
listController.createList("First List")
listController.createList("Another List")
listController.createList("List poopy")
uiController.updateLists()