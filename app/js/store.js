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
    window.app = window.app || {};
    window.app.Store = Store;
})(window)