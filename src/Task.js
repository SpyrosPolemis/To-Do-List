export default class {
    constructor(name, listID) {
        this.name = name
        this.ID = crypto.randomUUID()
        this.description = ""
        this.completed = false
        this.listID = listID
        this.priority = 0
        this.dateCreated = new Date()
        this.dateDue = null
    }

    setPriority(priorityLevel) {
        this.priority = Number(priorityLevel)
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