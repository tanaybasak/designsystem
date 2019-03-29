"use strict";

// DatePicker Controller
let datePickerController = (function() {
    
    return {
        
    };
    
})();


// UI Controller
let UIController = (function() {
    
    let DOMstrings = {
        weekPanel: '.hcl-datePicker-panel-week',
        daysPanel: '.hcl-datePicker-panel-days'
    };
    
    return {
        initWeekPanel: function(){
           let week = ['S','M','T','W','Th','F','S'];
           let html = '<span class="">%weekDay%</span>';
           let element = DOMstrings.weekPanel;
           week.forEach((weekDay)=>{
                let weekDayHTML = html.replace('%weekDay%',weekDay);
                document.querySelector(element).insertAdjacentHTML('beforeend', weekDayHTML);
           });
        },

        initDaysPanel :function(){
            
            let html = '<span class="">%day%</span>';
            let element = DOMstrings.daysPanel;
            for(let i=1; i<=37; i++){
                let dayHTML = html.replace('%day%',String(i));
                document.querySelector(element).insertAdjacentHTML('beforeend', dayHTML);
            }
         },
    };
    
})();


// Global controller
let controller = (function(budgetCtrl, UICtrl) {
    
    let setupEventListeners = function() {
        let DOM = UICtrl.getDOMstrings();
        
           
    };
    
    
    return {
        init: function() {
            console.log('Application has started.');
            UICtrl.initWeekPanel();
            UICtrl.initDaysPanel();
            setupEventListeners();
        }
    };
    
})(datePickerController, UIController);


controller.init();