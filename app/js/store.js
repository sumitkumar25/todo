/**
 * Created by sukumar on 5/29/2017.
 * expects all null and empty validations are done in the model
 */
(function (window) {
    function Store(name) {
        this.db_name = name;
        if (!window.localStorage[name]) {
            var appData = {};
            window.localStorage[name] = JSON.stringify(appData);
        }
    }

    Store.prototype.newTodoList = function (title) {
        this.title = title;
        this.todo = [];
    }
    Store.prototype.newTodoItem = function (title, status) {
        this.title = new String(title).trim();
        this.id = "item_" + new Date().getTime();
        this.status = status || false;
    }
    /**
     * Todo items fn's start*/
    Store.prototype._addNewTodoItem = function (title, status, listId, callback, id) {
        if (!title || !listId) {
            return;
        }
        var todoItem = new this.newTodoItem(title, status);
        /*        if (!id) {
         id = new Date().getTime();
         id = "item_" + id;
         console.log(id);
         }*/
        var appData = JSON.parse(localStorage[this.db_name]);
        var listData = appData[listId]["todo"];
        listData.push(todoItem);
        localStorage[this.db_name] = JSON.stringify(appData);
        console.log("this in _addNewTodoItem\n" + this);
        callback.call();
    }
    /**
     *  Todo items fn's end*/
    Store.prototype._addNewTodoList = function (title, callback, id) {
        callback = callback || function () {
            }
        if (!id) {
            id = new Date().getTime();
        }
        var appData = JSON.parse(localStorage[this.db_name]);
        appData[id] = new this.newTodoList(title);
        localStorage[this.db_name] = JSON.stringify(appData);
        callback.call(this);
    }
    /**
     * currently refreshing all data.
     * need to implement individual refresh
     * */
    Store.prototype._edit = function (id, title, callback) {
        var appData = JSON.parse(localStorage[this.db_name])
        var listData = appData[id];
        listData.title = title;
        appData[id] = listData;
        localStorage[this.db_name] = JSON.stringify(appData);
        callback();
    }
    Store.prototype._find = function (id, callback) {
        callback.call(this, id, (JSON.parse(localStorage[this.db_name]))[id]);
    }
    Store.prototype._readAll = function (callback) {
        callback.call(this, JSON.parse(localStorage[this.db_name]));
    }
    Store.prototype.deleteList = function (id, callback) {
        var appData = JSON.parse(localStorage[this.db_name]);
        delete appData[id];
        localStorage[this.db_name] = JSON.stringify(appData);
        callback.call(null)
    }
    Store.prototype._deleteItem = function (id, lisId, callback) {
        var appData = JSON.parse(localStorage[this.db_name]);
        var listData = appData[lisId].todo;
        for (var i = 0; i < listData.length; i++) {
            if (listData[i].id == id) {
                listData.splice(i, i + 1)
                break;
            }
        }
        localStorage[this.db_name] = JSON.stringify(appData);
        callback.call();
    }
    Store.prototype._editItem = function (title, id, listId, callback) {
        var appData = JSON.parse(localStorage[this.db_name]);
        var listData = appData[listId].todo;
        for (var i = 0; i < listData.length; i++) {
            if (listData[i].id == id) {
                listData[i].title = title;
                break;
            }
        }
        localStorage[this.db_name] = JSON.stringify(appData);
        callback.call();
    }
    Store.prototype._editStatus = function (status, todoId, listId, callback) {
        var appData = JSON.parse(localStorage[this.db_name]);
        var listData = appData[listId].todo;
        for (var i = 0; i < listData.length; i++) {
            if (listData[i].id == todoId) {
                listData[i].status = status;
                break;
            }
        }
        localStorage[this.db_name] = JSON.stringify(appData);
        callback.call();
    }
    window.app = window.app || {};
    window.app.Store = Store;
})(window)