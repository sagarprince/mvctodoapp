'use strict';

define([
    'event'
    ], function(
        Event
    ) {

    /**
     * The TodoView. View presents the model and provides
     * the UI events. The controller is attached to these
     * events to handle the user interraction.
     */
    function TodoView(model) {
        this._model = model;

        this.domEl = $('body');
        this.formEl = $('form');
        this.todoInCompleted = $('#todo-in-completed');
        this.todoCompleted = $('#todo-completed');

        this.todoListModified = new Event(this);
        this.newTodoAdded = new Event(this);
        this.modifyTodoItem = new Event(this);
        this.deleteTodoItem = new Event(this);

        this.attachModelListeners();
        this.registerEvents();
    }

    TodoView.prototype = {

        /**
         * Attach Model Listeners
         * 
         * @method attachModelListeners
         */
        attachModelListeners: function() {
            var self = this;

            this._model.itemAdded.attach(function() {
                self.renderTodoList();    
            });

            this._model.itemModified.attach(function() {
                self.renderTodoList();    
            });
        },

        /**
         * Register DOM Events
         * 
         * @method registerEvents
         */
        registerEvents: function() {
            var self = this;

            // submit new todo.
            this.formEl.submit(function() {
                var formData = $(this).serializeArray();
                self.addTodoItem(formData);
                return false;
            });

            // modify todo
            this.domEl.off('click', '.complete').on('click', '.complete', function() {
                var liParent = $(this).closest('li');
                var ulParent = liParent.closest('ul');
                var name = liParent.find('span.todo-name').text();
                var flag = ulParent.attr('data-completed');
                var completeFlag = true;
                if (flag === 'true') {
                    completeFlag = true;
                } else {
                    completeFlag = false;
                }
                var obj = {
                    name: name,
                    completeFlag: completeFlag
                };
                self.modifyTodoItem.notify(obj);
                console.log(obj);
            });

            // delete todo
            this.domEl.off('click', '.remove').on('click', '.remove', function() {
                var liParent = $(this).closest('li');
                var name = liParent.find('span.todo-name').text();
                self.domEl.find('#delete-todo-yes').attr('data-name', name);
                self.domEl.find('#delete-todo-confirm-modal').openModal();
                console.log(obj);
            });           

            this.domEl.off('click', '#delete-todo-yes').on('click', '#delete-todo-yes', function() {
                var name = $(this).attr('data-name');
                var obj = {
                    name: name
                };
                console.log(obj);
                self.deleteTodoItem.notify(obj);
                self.domEl.find('#delete-todo-confirm-modal').closeModal();
            });
        },

        /**
         * Show Todo List View
         * 
         * @method show
         */
        show: function() {
            console.log("show todo list");
            this.renderTodoList();
        },

        /**
         * Render Todo List
         * 
         * @method renderTodoList
         */
        renderTodoList: function() {
            var self = this;

            //In completed todo items
            var todoItems = this._model.getItems(false);
            this.todoInCompleted.html('');
            if (todoItems.length > 0) {
                var todoInCompletedHtml = '';
                _.each(todoItems, function(todo) {
                    var todoItemTemplate = $('#todo-item-tmpl').html(),
                        compiledTemplate = Template7.compile(todoItemTemplate),
                        todoItemHtml = compiledTemplate({
                            name: todo.name
                        });

                    todoInCompletedHtml = todoInCompletedHtml + todoItemHtml;
                });

                this.todoInCompleted.html(todoInCompletedHtml);
            }

            // completed todo items
            var completedTodoItems = this._model.getItems(true);
            this.todoCompleted.html('');
            if (completedTodoItems.length > 0) {
                var todoCompletedHtml = '';
                _.each(completedTodoItems, function(todo) {
                    var todoItemTemplate = $('#todo-item-tmpl').html(),
                        compiledTemplate = Template7.compile(todoItemTemplate),
                        todoItemHtml = compiledTemplate({
                            name: todo.name
                        });

                    todoCompletedHtml = todoCompletedHtml + todoItemHtml;
                });

                this.todoCompleted.html(todoCompletedHtml);
            }           
        },

        /**
         * Add todo item
         * 
         * @param formData
         * @method addTodoItem
         */
        addTodoItem: function(formData) {
            var formDataObject = {}, todoName = '';
            if (formData.length > 0) {
                _.each(formData, function(obj) {
                    var key = obj.name,
                    value = obj.value;
                    formDataObject[key] = value;
                });
                
                todoName = $.trim(formDataObject.todo_name);

                if (todoName !== '') {
                    if (this._model.checkTodoItemExist(todoName) === false) {
                        var todoItem = {
                            name: todoName,
                            completed: false
                        };
                        this.newTodoAdded.notify(todoItem);
                        this.formEl.find('input[name="todo_name"]').val('');
                    } else {
                        this.formEl.find('input[name="todo_name"]').blur();
                        $('#alert-modal .modal-content p').html('This activity is already exist.');
                        $('#alert-modal').openModal();
                    }               
                } else {
                    this.formEl.find('input[name="todo_name"]').blur();
                    $('#alert-modal .modal-content p').html('Please enter activity name.');
                    $('#alert-modal').openModal();
                }
            }
        }, 
        

    }

    return TodoView;

});