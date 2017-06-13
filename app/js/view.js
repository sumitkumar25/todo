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
        this._template_todoItem = window.qs("#newTodoItem");
        this._classTodoList = 'todoList';
        this._template_todoItem = window.qs("#newTodoItem");
        this._classTodoItem = 'todoItem';
        this._ENTER_SAVE = 13;
        this._ESC_ABORT = 27;
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
                callback(self.getParentListId(e));
            });
        }
        if (event == 'editTodoList') {
            window.delegateEvent(self._todoList_display, "h3", "dblclick", function (e) {
                callback(self.getParentListId(e));
            });
        }
        if (event == "editTodoFinish") {
            window.delegateEvent(self._todoList_display, "h3 input", "keypress", function (e) {
                if (e.which == self._ENTER_SAVE || e.keyCode == self._ENTER_SAVE) {
                    this.blur();
                    callback(self.getParentListId(e), e.target.value);
                }
            });
        }
        if (event == "editTodoAbort") {
            window.delegateEvent(self._todoList_display, "h3 input", "keyup", function (e) {
                if (e.which == self._ESC_ABORT || e.keyCode == self._ESC_ABORT) {
                    this.blur();
                    callback();
                }
            })
        }
        if (event == "createTodoItem") {
            window.delegateEvent(self._todoList_display, ".addTodo", "keypress", function (e) {
                if (e.which == self._ENTER_SAVE || e.keyCode == self._ENTER_SAVE) {
                    this.blur();
                    callback(this.value, window.parent(this, "section").id);
                }
            });
        }
        if (event == "deleteTodoItem") {
            window.delegateEvent(self._todoList_display, ".deleteItemBtn", "click", function (e) {
                callback(window.parent(e.target, "li").id, window.parent(e.target, "section").id);
            })
        }

        if (event == "editTodoItem") {
            window.delegateEvent(self._todoList_display, "li", "dblclick", function (e) {
                callback(e.target.innerText, e.target.id, window.parent(e.target, "section").id);
            })
        }
        if (event == "editTodoItemAbort") {
            window.delegateEvent(self._todoList_display, "li input", "keyup", function (e) {
                if (e.which == self._ESC_ABORT || e.keyCode == self._ESC_ABORT) {
                    this.blur();
                    callback();
                }
            })
        }
        if (event == "editTodoItemFinish") {
            window.delegateEvent(self._todoList_display, "li input", "keypress", function (e) {
                if (e.which == self._ENTER_SAVE || e.keyCode == self._ENTER_SAVE) {
                    this.blur();
                    callback(e.target.value, window.parent(e.target, 'li').id, self.getParentListId(e));
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
        var newEditField = this.createEditBox(title);
        var h3 = window.qsa('h3', document.getElementById(id))[0];
        h3.innerHTML = '';
        h3.appendChild(newEditField);
    }
    View.prototype.createEditBox = function (title) {
        var elem = document.createElement('input');
        elem.type = "text";
        elem.value = title.title ? title.title.trim() : title.trim();
        return elem;
    }
    View.prototype.getParentListId = function (e) {
        var id = parent(e.target, 'section').id;
        if (id && parseInt(id, 10)) {
            return id;
        }
    }
    View.prototype.editTodoListItem = function (id, title) {
        var newEditField = this.createEditBox(title);
        window.qs("#" + id).appendChild(newEditField);
    }
    /**
     * we first save the list and then we display the list therefor list id will always be available*/
    View.prototype.createNewTodoList = function (listItems, listId) {
        var newListSection = window.qsa("." + this._classTodoList, this._template_todoList.content)[0].cloneNode(true);
        var heading = window.qsa('h3', newListSection)[0];
        heading.appendChild(document.createTextNode(listItems.title));
        newListSection.id = listId;
        // list items
        var data = listItems.todo;
        for (var i = 0; i < data.length; i++) {
            if (data[i]) {
                var newItem = window.qsa("." + this._classTodoItem, this._template_todoItem.content)[0].cloneNode(true);
                //newItem.innerHTML = '';
                newItem.appendChild(document.createTextNode(data[i].title));
                newItem.id = data[i].id;
                window.qs('ul', newListSection).appendChild(newItem);
            }
        }
        return newListSection;
    }
    window.app = window.app || {};
    window.app.View = View;
})(window)