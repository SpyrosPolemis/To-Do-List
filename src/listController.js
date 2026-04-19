import List from "./list.js"

let lists = []

const listController = {
    deleteList(listID) {
        const listToDelete = lists.findIndex(list => list.id === listID)
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
    }
}

export default listController