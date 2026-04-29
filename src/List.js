import Task from "./Task.js"
import { masterlist } from "./listController.js";

export default class List {
    constructor(name) {
        this.name = name;
        this.tasks = [];
        this.ID = crypto.randomUUID();
    }

    addTask(taskName) { 
        const newTask = new Task(taskName, this.ID)
        this.tasks.push(newTask)
        return newTask
    }
    deleteTask(taskToDelete) {
        this.tasks.splice(this.tasks.findIndex(task => task.ID === taskToDelete.ID), 1)
        if (this.ID !== masterlist.ID) {
            masterlist.deleteTask(taskToDelete)
        }
    }
}