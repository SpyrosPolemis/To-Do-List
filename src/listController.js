import List from "./List.js"

let lists = []

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
    }
}

export default listController