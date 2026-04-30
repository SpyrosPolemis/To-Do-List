export default class {
    constructor(name, listID) {
        this.name = name
        this.ID = crypto.randomUUID()
        this.description = ""
        this.completed = false
        this.listID = listID
        this.priority = 0 // 0-4
    }

    setPriority(priorityLevel) {
        if (priorityLevel === "None" || priorityLevel === "Low" || priorityLevel === "Medium" || priorityLevel == "High") {
            this.priority = priorityLevel
        }
    }
    markComplete() {
        this.completed = true
    }
    markIncomplete() {
        this.completed = false
    }
}