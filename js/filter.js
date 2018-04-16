var Filter  = (function(){

    function setFilter(newValue){
        value = newValue;
        this.filterChangeCb(value);
    }

    function attachClassName(button){
        this.allFilterButton.classList.remove('active');
        this.activeFilterButton.classList.remove('active');
        this.completedFilterButton.classList.remove('active');
        button.classList.add('active');
    }

    var Filter = function(onFilterChange){
        this.filterChangeCb = onFilterChange ? onFilterChange :function(){};
        this.allFilterButton = document.getElementById('allfilter');
        this.activeFilterButton = document.getElementById('activefilter');
        this.completedFilterButton = document.getElementById('completedfilter');
        this.initFiltersEvents();
        setFilter = setFilter.bind(this);
        attachClassName = attachClassName.bind(this);
        attachClassName(this.allFilterButton);
    }

    Filter.ALL = 3;
    Filter.ACTIVE = 1;
    Filter.COMPLETED = 2;
    var value = Filter.ALL;
    
    Filter.prototype = {
        initFiltersEvents: function(){
            this.allFilterButton.addEventListener('click', this.setAllFilter.bind(this));
            this.activeFilterButton.addEventListener('click', this.setActiveFilter.bind(this));
            this.completedFilterButton.addEventListener('click', this.setCompletedFilter.bind(this));
        },
    
        setAllFilter: function(){
            setFilter(Filter.ALL);
            attachClassName(this.allFilterButton);
        },
    
        setActiveFilter: function(){
            setFilter(Filter.ACTIVE);
            attachClassName(this.activeFilterButton);
        },
    
        setCompletedFilter: function(){
            setFilter(Filter.COMPLETED);
            attachClassName(this.completedFilterButton);
        },

        getFilterValue: function(){
            return value;
        }
    }

    return Filter;
})()