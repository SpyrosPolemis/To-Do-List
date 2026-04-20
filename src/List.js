import Task from "./Task.js"

export default class List {
    constructor(name) {
        this.name = name;
        this.tasks = [];
        this.ID = crypto.randomUUID();
    }

    addTask(taskName) { 
        this.tasks.push(new Task(taskName))
    }
}