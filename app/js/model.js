/**
 * Created by sukumar on 5/29/2017.
 */
(function (window) {
    function Model(store) {
        this.store = store
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
            this.store._readAll(callback);
        }
    }

    window.app = window.app || {};
    window.app.Model = Model;
})(window)