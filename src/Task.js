export default class {
    constructor(name) {
        this.name = name
        this.ID = crypto.randomUUID()
        this.description = ""
        this.completed = false
    }
    
    markComplete() {
        this.completed = true
    }
    markIncomplete() {
        this.completed = false
    }
}