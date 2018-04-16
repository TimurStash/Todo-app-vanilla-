var TodoRow = (function(){
    var TodoRow = function(todo, onCompleteClick, onDeleteClick){
        this.todo = todo;

        this.li = createLi(todo.isCompleted)
        this.completeButton = createCompleteButton(onCompleteClick, this);
        this.deleteButton = createDeleteButton(onDeleteClick, this);
        var textNode = createTextNode(todo.text);
        
        this.li.appendChild(this.completeButton);
        this.li.appendChild(textNode);
        this.li.appendChild(this.deleteButton);
    }

    TodoRow.prototype = {
        setIsCompleted: function(isCompleted){
            isCompleted ?this.li.classList.add('comleted') : this.li.classList.remove('comleted');
        }
    }

    function createLi(isCompleted){
        var li = document.createElement('li');
        if(isCompleted){
            li.classList.add('comleted');
        }
        return li;
    }

    function createTextNode(text){
        var textNode = document.createTextNode(text);
        return textNode;
    }

    function createCompleteButton(onCompleteClick, row){
        return createButton('Complete', function(){
            onCompleteClick(row)
        });
    }

    function createDeleteButton(onDeleteClick, row){
        return createButton('Delete', function(){
            onDeleteClick(row)
        });
    }

    function createButton(text, clickHandler){
        var button = document.createElement('input');
        button.type = 'button';
        button.value = text;
        button.addEventListener('click', clickHandler);
        return button;
    }

    return TodoRow;
})()