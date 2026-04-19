export default class List {
    constructor(name) {
        this.name = name;
        this.tasks = [];
        this.ID = crypto.randomUUID();
    }
}