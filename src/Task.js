export default class {
    constructor(name, listID) {
        this.name = name
        this.ID = crypto.randomUUID()
        this.description = ""
        this.completed = false
        this.listID = listID
        this.priority = "None"
        this.dateCreated = new Date()
        this.dateDue = null
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
    calculateTimeRemaining() {
        if (dateDue != null) {
            return this.dateDue - new Date()   
        }
    }
}