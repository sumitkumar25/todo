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
        self.view.bindEvents("deleteTodoList", function (id) {
            self.deleteTodoList(id)
        });

    }

    Controller.prototype.initialize = function () {
        this.showAll();
    }
    Controller.prototype.editTodoList = function (id) {
        this.model.read(id, function (id, title) {
            this.view.editListTitle(id, title);
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
    // Export to window
    window.app = window.app || {};
    window.app.Controller = Controller;
})(window)