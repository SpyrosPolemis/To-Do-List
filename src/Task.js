export default class {
    constructor(name) {
        this.name = name
        this.ID = crypto.randomUUID()
        this.description = ""
    }
}