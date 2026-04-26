export default class {
    constructor(name, listID) {
        this.name = name
        this.ID = crypto.randomUUID()
        this.description = ""
        this.completed = false
        this.listID = listID
    }
    
    markComplete() {
        this.completed = true
    }
    markIncomplete() {
        this.completed = false
    }
}