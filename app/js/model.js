/**
 * Created by sukumar on 5/29/2017.
 */
(function (window) {
    function Model(store) {
        this.store = store
    }

    Model.prototype.addNewTodoItem = function (title, status, listId, callback) {
        if (!title.trim()) {
            console.log("todo item not available to save");
            alert("unable to save new todoitem check console for more info");
        }
        else {
            this.store._addNewTodoItem(title, status, listId, callback);
        }
    }
    Model.prototype.addNewTodoList = function (title, callback) {
        if (!title.trim()) {
            console.log("title not available to save");
            alert("unable to save new todolist check console for more info");
        }
        else {
            this.store._addNewTodoList(title, callback);
        }
    }
    Model.prototype.deleteTodoList = function (id, callback) {
        this.store.deleteList(id, callback);
    }
    Model.prototype.read = function (id, callback) {
        if (id && typeof id != 'function') {
            this.store._find(id, callback);
        } else {
            callback = id;
            this.store._readAll(callback);
        }
    }
    Model.prototype.editTodoListFinish = function (id, title, callback) {
        this.store._edit(id, title, callback);
    }
    Model.prototype.deleteTodoItem = function (id, listId, callback) {
        this.store._deleteItem(id, listId, callback);
    }
    Model.prototype.editTodoItem = function (title, id, listId, callback) {
        this.store._editItem(title, id, listId, callback);
    }
    Model.prototype.statusChangeTodoItem = function (status, todoId, listId, callback) {
        this.store._editStatus(status, todoId, listId, callback);
    }
    window.app = window.app || {};
    window.app.Model = Model;
})(window)