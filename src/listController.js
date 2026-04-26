import List from "./List.js"

let lists = []
let masterlist = new List("All Tasks")

const listController = {
    deleteList(listID) {
        const listToDelete = lists.findIndex(list => list.ID === listID)
        if (listToDelete !== -1) {
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
        console.log(masterlist.tasks)
        let allTasks = new Set([...masterlist.tasks])
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