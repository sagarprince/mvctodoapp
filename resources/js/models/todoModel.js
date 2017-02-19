'use strict';

define(['event'], function(Event) {

    /**
     * The TodoModel. Model stores items and notifies
     * observers about changes.
     */
    function TodoModel() {
        this.items = this.getFromStorage();
        this.itemAdded = new Event(this);
        this.itemModified = new Event(this);
    }

    TodoModel.prototype = {

        /**
         * Save into Local Storage
         * 
         * @method saveIntoStorage
         */
        saveIntoStorage: function() {
            if (typeof(Storage) !== "undefined") {
                window.localStorage.setItem('todoItems', JSON.stringify(this.items));
            } else {
                console.log('storage is not supported.');
            }
        },

        /**
         * Get from Local Storage
         * 
         * @method getFromStorage
         */
        getFromStorage: function() {
            if (typeof(Storage) !== "undefined") {
                var data = JSON.parse(window.localStorage.getItem('todoItems'));
                if (data === null) {
                    data = [];
                }
                return data;
            } 

            return [];
        },

        /**
         * Get todo items
         * 
         * @method getItems
         */
        getItems: function(flag) {
            if (typeof flag !== 'undefined') {
                var todoItems = _.filter(this.items, function(item) {
                    if (item.completed === flag) {
                        return item;
                    }
                });           
                return todoItems;    
            } 

            return this.items;            
        },

        /**
         * Add todo items
         * 
         * @param todoItem
         * @method addTodoItem
         */
        addTodoItem: function(todoItem) {
            this.items.push(todoItem);
            this.itemAdded.notify();
        },

        /**
         * Modify Todo Item
         * 
         * @param name, completeFlag
         * @method modifyTodoItem
         */
        modifyTodoItem: function(name, completeFlag) {
            if (this.items.length > 0) {
                var todoItem = _.findWhere(this.items, { name: name }); 
                todoItem.completed = completeFlag;
            }

            this.saveIntoStorage();

            this.itemModified.notify();
        },

        /**
         * Delete Todo Item
         * 
         * @param name
         * @method deleteTodoItem
         */
        deleteTodoItem: function(name) {
            this.items = _.without(this.items, _.findWhere(this.items, {
                name: name
            }));  

            this.saveIntoStorage();

            this.itemModified.notify();
        },

        /**
         * Check Todo Item Exist
         * 
         * @param name
         * @method checkTodoItemExist
         */
        checkTodoItemExist: function(name) {
             var todoIndex = _.findIndex(this.items, { name: name });
             console.log(todoIndex);
             if (todoIndex > -1) {
                 return true;
             }

             return false;
        }
    }

    return TodoModel;

});