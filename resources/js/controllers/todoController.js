'use strict';

define(['event'], function(Event) {

    /**
     * The Todo Controller. Controller responds to user actions and
     * invokes changes on the model.
     */
    function TodoController(model, view) {
        this._model = model;
        this._view = view;

        this.attachViewListeners();
    }

    TodoController.prototype = {

        /**
         * Attach View Listeners
         * 
         * @method attachViewListeners
         */
        attachViewListeners:  function() {
            var self = this;

            this._view.newTodoAdded.attach(function(sender, todoName) {
                self.addTodo(todoName);
            });

            this._view.modifyTodoItem.attach(function(sender, args) {
                var name = args.name,
                completeFlag = args.completeFlag;
                self.modifyTodo(name, completeFlag);
            });

            this._view.deleteTodoItem.attach(function(sender, args) {
                var name = args.name;
                self.deleteTodo(name);
            });
        },

        /**
         * Add new todo
         * 
         * @param todoItem
         * @method addTodo
         */
        addTodo: function(todoItem) {
            this._model.addTodoItem(todoItem);
        },

        /**
         * Modify Todo Item
         * 
         * @param name, completeFlag
         * @method modifyTodo
         */
        modifyTodo: function(name, completeFlag) {
            this._model.modifyTodoItem(name, completeFlag);
        },

        /**
         * Delete Todo Item
         * 
         * @param name
         * @method deleteTodo
         */
        deleteTodo: function(name) {
            this._model.deleteTodoItem(name);
        }

    }

    return TodoController;

});