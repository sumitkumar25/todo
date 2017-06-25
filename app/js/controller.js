/**
 * Created by sukumar on 5/29/2017.
 */
(function (window) {
    function Controller(model, view) {
        var self = this;
        self.model = model;
        self.view = view;
        self.view.bindEvents("createNewTodoList", function (title) {
            self.newTodoList(title);
        });
        self.view.bindEvents("editTodoList", function (id) {
            self.editTodoList(id)
        });
        self.view.bindEvents("editTodoFinish", function (id, title) {
            self.editTodoFinish(id, title);
        });
        self.view.bindEvents("editTodoAbort", function () {
            self.showAll();
        });
        self.view.bindEvents("deleteTodoList", function (id) {
            self.deleteTodoList(id)
        });
        self.view.bindEvents("createTodoItem", function (title, status, listid) {
            self.addNewTodoItem(title, status, listid);
        });
        self.view.bindEvents("deleteTodoItem", function (id, listid) {
            self.deleteTodoItem(id, listid);
        });
        self.view.bindEvents("editTodoItem", function (title, id, listid) {
            self.editTodoItem(title, id, listid);
        });
        self.view.bindEvents("editTodoItemFinish", function (title, id, listid) {
            self.editTodoItemFinish(title, id, listid);
        });
        self.view.bindEvents("editTodoItemAbort", function () {
            self.showAll();
        });
        self.view.bindEvents("statusChangeTodoItem", function (status, todoid, listid) {
            self.statusChangeTodoItem(status, todoid, listid);
        });
        self.view.bindEvents("filterChange", function (param, listId) {
            self.filter(param, listId);
        });
    }

    Controller.prototype.initialize = function () {
        this.showAll();
    }
    /*events for todoItems start*/
    Controller.prototype.deleteTodoItem = function (id, listId) {
        var self = this;
        self.model.deleteTodoItem(id, listId, function (e) {
            self.showAll();
        })
    }
    Controller.prototype.editTodoItemFinish = function (title, id, listId) {
        var self = this;
        self.model.editTodoItem(title, id, listId, function () {
            self.showAll();
        });
    }
    Controller.prototype.editTodoItem = function (title, id, listId) {
        var self = this;
        self.view.editTodoListItem(id, title);
    }
    Controller.prototype.addNewTodoItem = function (title, status, listId) {
        var self = this;
        self.model.addNewTodoItem(title, status, listId, function () {
            self.showAll();
        });
    }
    /*events for todoItems   end*/
    Controller.prototype.editTodoFinish = function (id, title) {
        var self = this;
        self.model.editTodoListFinish(id, title, function () {
            self.showAll();
        });
    }
    Controller.prototype.editTodoList = function (id) {
        var self = this;
        self.model.read(id, function (id, title) {
            self.view.editListTitle(id, title);
        });
    }
    Controller.prototype.deleteTodoList = function (id) {
        var self = this;
        this.model.deleteTodoList(id, function () {
            //alert("delete todo")
            self.view.removeTodoList(id);
        })
    }
    Controller.prototype.showAll = function () {
        var self = this;
        self.model.read(function (data) {
            self.view.render(data);
        });
    }
    Controller.prototype.newTodoList = function (title) {
        var self = this;
        self.model.addNewTodoList(title, function () {
            self.showAll();
            // clear todolist generator.
        })
    }
    Controller.prototype.statusChangeTodoItem = function (status, todoid, listid) {
        var self = this;
        self.model.statusChangeTodoItem(status, todoid, listid, function () {
            self.showAll();
        })
    }
    Controller.prototype.filter = function (filterParam, listId) {
        var self = this;
        //we have only ui filter no need to read from db
        //routing through controller for any future addition
        self.view.filterUpdate(filterParam, listId);
    }
    // Export to window
    window.app = window.app || {};
    window.app.Controller = Controller;
})(window)