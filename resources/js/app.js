'use strict';

define([
    'models/todoModel',
    'views/todoView',
    'controllers/todoController'
], function(
    TodoModel,
    TodoView,
    TodoController
) {

    function App() {

    }

    App.prototype = {

        /**
         * Startup point of application.
         * 
         * @method startup
         */
        startup: function() {
            var todoModel = new TodoModel(),
            todoView = new TodoView(todoModel),
            todoController = new TodoController(todoModel, todoView);

            todoView.show();
        }       

    }

    return new App();

});