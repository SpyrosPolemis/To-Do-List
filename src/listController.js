import List from "./List.js"

let lists = []
let masterlist = new List("All Tasks")
lists.push(masterlist)
export { masterlist }

const listController = {
    deleteList(listID) {
        const listToDelete = lists.findIndex(list => list.ID === listID)
        if (listToDelete !== -1) {
            masterlist.tasks = masterlist.tasks.filter(task => task.listID !== listID)
            lists.splice(listToDelete, 1)
        } 
    },
    createList(name) {
        lists.push(new List(name))
    },
    getLists() {
        return lists
    },
    getListNames() {
        return lists.map((list) => list.name)
    },
    getMasterList() {
        let allTasks = new Set([...masterlist.tasks]) // using set to avoid duplicate tasks when appending
        lists.forEach((list) => {
            list.tasks.forEach((task) => {
                allTasks.add(task)
            })
        })
        masterlist.tasks = [...allTasks]
        return masterlist
    }
}

export default listController