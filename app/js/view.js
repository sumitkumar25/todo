/**
 * Created by sukumar on 5/29/2017.
 */
(function (window) {
    function View() {
        this._todoList_create = window.qs('#todo_create');
        this._todoList_display = window.qs('#todo_display');
        this._field_todoList_create = window.qs('#todo_title');
        this._btn_todo_create = window.qs('#btn_todo_create');
        this._template_todoList = window.qs("#newTodoList");
        this._classTodoList = 'todoList';
        this._template_todoItem = window.qs("#newTodoItem");
    }

    View.prototype.bindEvents = function (event, callback) {
        var self = this;
        if (event == "createNewTodoList") {
            window.wrapperEventListener(this._btn_todo_create, 'click', function () {
                callback(self._field_todoList_create.value);
            });
        }

        if (event == "deleteTodoList") {

            window.delegateEvent(self._todoList_display, ".deleteBtn", 'click', function (e) {
                var id = parent(e.target, 'section').id;
                if (id && parseInt(id, 10)) {
                    callback(id);
                }
            });
        }
        if (event == 'editTodoList') {
            window.delegateEvent(self._todoList_display, "h3", "dblclick", function (e) {
                var id = parent(e.target, 'section').id;
                if (id && parseInt(id, 10)) {
                    callback(id);
                }
            });
        }
    }
    View.prototype.render = function (data) {
        //rendering all
        var keys = Object.keys(data);
        this._todoList_display.innerHTML = '';
        for (var key in keys) {
            var dataKey = keys[key];
            var isList = document.getElementById("#" + dataKey);
            if (isList && isList.length) {

            } else {
                this.renderNewTodoList(data[dataKey], dataKey)
            }
        }

    }
    View.prototype.removeTodoList = function (id) {
        var elem = document.getElementById(id);
        this._todoList_display.removeChild(elem);
    }
    View.prototype.renderNewTodoList = function (listItems, listId) {
        var newList = this.createNewTodoList(listItems, listId);
        this._todoList_display.appendChild(newList);
    }
    View.prototype.editListTitle = function (id, title) {
       var newEditField = this.getEditBox 
    }
    /**
     * we first save the list and then we display the list therefor list id will always be available*/
    View.prototype.createNewTodoList = function (listItems, listId) {
        var newListSection = window.qsa("." + this._classTodoList, this._template_todoList.content)[0].cloneNode(true);
        var heading = window.qsa('h3', newListSection)[0];
        heading.appendChild(document.createTextNode(listItems.title));
        newListSection.id = listId;
        return newListSection;
    }
    window.app = window.app || {};
    window.app.View = View;
})(window)