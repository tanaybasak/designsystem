"use strict";

// DatePicker Controller
let datePickerController = (function () {

    let currDateObj = {};

    return {

     
    };

})();


// UI Controller
let UIController = (function () {
  
    let DOMstrings = {
       orBorder: 'hcl-datePicker-container-hightlightError'

    };

  
    return {
       
    };
})();


// Main controller
let controller = (function (dateCtrl, UICtrl) {

    let setupEventListeners = function () {
        let DOM = UICtrl.getDOMstrings();
        document.querySelector(DOM.prevMonth).addEventListener('click', prevMonth);
      
       
    };


    return {
        init: function () {
            UICtrl.initDatePicker(dateCtrl.getCurrentMonthDetails());
            setupEventListeners();
        }
    };

})(datePickerController, UIController);

controller.init();