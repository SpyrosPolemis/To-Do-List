import Task from "./Task.js"
import { masterlist } from "./listController.js";

export default class List {
    constructor(name) {
        this.name = name;
        this.tasks = [];
        this.ID = crypto.randomUUID();
    }

    addTask(taskName) { 
        this.tasks.push(new Task(taskName, this.ID))
    }
    deleteTask(taskToDelete) {
        this.tasks.splice(this.tasks.findIndex(task => task.ID === taskToDelete.ID), 1)
        if (this.ID !== masterlist.ID) {
            masterlist.deleteTask(taskToDelete)
        }
    }
}