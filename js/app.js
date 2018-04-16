var App = (function (){

    var App = function(){
    }

    App.prototype = {
        run: function(){
            this.initMembers();
            this.attachEventsToControls();
            this.render();
        },

        initMembers: function(){
            this.todos = [];
            var defaultPagingSize = 5;
            this.todoTextInput = document.getElementById('todotitle');
            this.todoAddButton = document.getElementById('addtodo')
            this.todoListUl = document.getElementById('todolist');
            this.setPagingButton = document.getElementById('setpaging');
            this.pagingInput = document.getElementById('pagingsize');
            this.pagingInput.value = defaultPagingSize;
            this.paging = new Paging(this.todos.length, defaultPagingSize, this.pageChanged.bind(this));

            this.filter = new Filter(this.filterChanged.bind(this));
        },

        attachEventsToControls: function(){
            this.initAddButtonEvents();
            this.initPaginationEvents();
        },

        initAddButtonEvents: function(){
            this.todoAddButton.addEventListener('click', this.addNewTodo.bind(this));
        },

        initPaginationEvents: function(){
            this.setPagingButton.addEventListener('click', this.setPagingSize.bind(this))
        },

        setPagingSize: function(){
            this.paging.setItemsPerPage(+this.pagingInput.value);
            this.render();
        },

        addNewTodo: function(){
            if(!this.todoTextInput.value){
                alert('Please fill in the todo description');
                return;
            }
            var todo = new Todo(this.todoTextInput.value);
            this.todos.unshift(todo);
            this.todoTextInput.value = '';
            this.render();
        },

        toggeleCompleteTodo: function(row){
            row.todo.isCompleted = !row.todo.isCompleted;
            row.setIsCompleted(row.todo.isCompleted);
        },

        pageChanged: function(){
            this.render();
        },

        filterChanged: function(){
            this.render();
        },

        deleteTodo: function(row){
            var todosLength = this.todos.length;
            for(var i = 0; i < todosLength; i++){
                if(this.todos[i].id === row.todo.id){
                    this.todos.splice(i, 1);
                    break;
                }
            }
            this.render();
        },

        getFilteredTodos: function(){
            var filterValue = this.filter.getFilterValue();
            console.log(filterValue);
            if(filterValue === Filter.ALL){
                return this.todos;
            }
            return this.todos.filter(function(item){
                return filterValue === Filter.ACTIVE ? item.isCompleted === false : item.isCompleted === true;
            })
        },

        getPagedTodos: function(filteredTodos){
            var begin  = (this.paging.currentPage - 1) * this.paging.itemsPerPage;
            var end = begin + this.paging.itemsPerPage;
            return filteredTodos.slice(begin, end);
        },

        render: function(){
            while(this.todoListUl.lastChild){
                this.todoListUl.removeChild(this.todoListUl.lastChild);
            }
            var todos = this.getFilteredTodos();
            this.paging.setLength(todos.length);
            todos = this.getPagedTodos(todos);
            var fragment = document.createDocumentFragment();
            for(var i = 0; i < todos.length; i++){
                var todo = todos[i];
                var todoRow = new TodoRow(todo, this.toggeleCompleteTodo.bind(this), this.deleteTodo.bind(this));
                fragment.appendChild(todoRow.li);
            };
            this.todoListUl.appendChild(fragment);
        }
    }
    return new App();
})()