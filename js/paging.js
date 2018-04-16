var Paging = (function(){
    function getpagingItem(number){
        var a = document.createElement('a');
        a.href = 'javascript:;';
        a.appendChild(document.createTextNode(number));
        var selectPage = this.selectPage.bind(this);
        a.addEventListener('click', function(){
            selectPage(number);
        });
        return a;
    }
    var onPageChangeCb = function(){};

    var Paging = function(initialLength, initialItemsPerPage, onPageChange){
        this.length = initialLength;
        onPageChangeCb = onPageChange ? onPageChange : onPageChangeCb;
        this.itemsPerPage = initialItemsPerPage;
        this.currentPage = 1;
        this.pagingContainer = document.getElementById('pagingcontainer');
        getpagingItem = getpagingItem.bind(this);
        this.render();
    }
    
    Paging.prototype = {
        setItemsPerPage: function(newPerPage){
            this.itemsPerPage = newPerPage;
            this.render();
        },

        selectPage: function(number){
            this.currentPage = number;
            onPageChangeCb();
        },

        setLength: function(newLength){
            this.length = newLength;
            var lastPage = Math.ceil(this.length/this.itemsPerPage) || 1;
            if(lastPage < this.currentPage){
                this.currentPage = lastPage;
            }
            this.render();
        },
    
        setCurrentPage: function(newPage){
            this.currentPage = newPage;
            this.render();
        },
    
        render: function(){
            while(this.pagingContainer.lastChild){
                this.pagingContainer.removeChild(this.pagingContainer.lastChild);
            }
            var buttonsLength = Math.ceil(this.length/this.itemsPerPage);
            if(buttonsLength === 1) return;
            var fragment = document.createDocumentFragment();
            for(i = 1; i <= buttonsLength; i++){
                var a = getpagingItem(i);
                fragment.appendChild(a);
            }
            this.pagingContainer.appendChild(fragment);
        }
    }
    return Paging;
})()