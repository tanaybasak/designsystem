"use strict";

// DatePicker Controller
let datePickerController = (function () {

    let selectedMonthYear = {
        'month': '',
        'year': '',
    };

    return {
        getCurrentMonthDetails: function () {
            let date = String(new Date());
            let currDateObj = {
                'day': date.substring(0, 3),
                'month': date.substring(4, 7),
                'date': date.substring(8, 10),
                'year': date.substring(11, 15),
            };
            selectedMonthYear.month = currDateObj.month;
            selectedMonthYear.year = currDateObj.year;
            return currDateObj;
            // return {
            //     'day': 'Thu',
            //     'month': 'Mar',
            //     'date':'28',
            //     'year': '2019',
            // };
        },
        getPrevMonthDetails: function () {
            let date = String(new Date());
            let currDateObj = {
                'day': date.substring(0, 3),
                'month': date.substring(4, 7),
                'date': date.substring(8, 10),
                'year': date.substring(11, 15),
            };
            return currDateObj;
        },

        getNextMonthDetails: function () {
            let date = String(new Date());
            let currDateObj = {
                'day': date.substring(0, 3),
                'month': date.substring(4, 7),
                'date': date.substring(8, 10),
                'year': date.substring(11, 15),
            };
            return currDateObj;
        },

    };

})();


// UI Controller
let UIController = (function () {
    let weekDays = ['S', 'M', 'T', 'W', 'Th', 'F', 'S'];
    let weekDaysCalc = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Oct', 'Nov', 'Dec'];

    let DOMstrings = {
        weekPanel: '.hcl-datePicker-panel-week',
        daysPanel: '.hcl-datePicker-panel-days',
        prevMonth: '.hcl-datePicker-panel-month-prev',
        nextMonth: '.hcl-datePicker-panel-month-next',
        yearIncrease: '.hcl-datePicker-panel-month-selection-inputWrapper-arrows-up',
        yearDecrease: '.hcl-datePicker-panel-month-selection-inputWrapper-arrows-down',
    };

    let getDaysInMonth = function (month, year) {
        return new Date(year, month, 0).getDate();
    };


    let initWeekPanel = function () {

        let html = '<span class="">%weekDay%</span>';
        let element = DOMstrings.weekPanel;
        weekDays.forEach((weekDay) => {
            let weekDayHTML = html.replace('%weekDay%', weekDay);
            document.querySelector(element).insertAdjacentHTML('beforeend', weekDayHTML);
        });
    };

    let initDaysPanel = function (curMonthObj) {

        let numOfDaysInMonth = getDaysInMonth(months.indexOf(curMonthObj.month) + 1, Number(curMonthObj.year));
        let html = '<span id="hcl-datePicker-%day%">%day%</span>';
        let element = DOMstrings.daysPanel;

        //days from previous month

        let numOfDaysFromPrevMonth = weekDaysCalc.indexOf(curMonthObj.day) - Number(curMonthObj.date) % 7;  // Need to be shown in datePicker
        numOfDaysFromPrevMonth = numOfDaysFromPrevMonth < 0 ? 7 + numOfDaysFromPrevMonth : numOfDaysFromPrevMonth;
        let numOfDaysInPrevMonth = getDaysInMonth(months.indexOf(curMonthObj.month), months.indexOf(curMonthObj.month) === 0 ? Number(curMonthObj.year) - 1 : Number(curMonthObj.year));

        for (let i = numOfDaysInPrevMonth - numOfDaysFromPrevMonth; i <= numOfDaysInPrevMonth; i++) {
            let dayHTML = html.replaceAll('%day%', String(i));
            document.querySelector(element).insertAdjacentHTML('beforeend', dayHTML);
        }

        // days from current month
        for (let i = 1; i <= numOfDaysInMonth; i++) {
            let dayHTML = html.replaceAll('%day%', String(i));
            document.querySelector(element).insertAdjacentHTML('beforeend', dayHTML);
        }

        // days from next month  
        for (let i = 1; i < 42 - numOfDaysInMonth - numOfDaysFromPrevMonth; i++) {
            let dayHTML = html.replaceAll('%day%', String(i));
            document.querySelector(element).insertAdjacentHTML('beforeend', dayHTML);
        }
    };

    String.prototype.replaceAll = function (search, replacement) {
        let target = this;
        return target.split(search).join(replacement);
    };

    let initMonthYearPanel = function () {

    };

    return {
        initDatePicker: function (curMonthObj) {
            initWeekPanel();
            initDaysPanel(curMonthObj);
            initMonthYearPanel(curMonthObj);
        },
        getDOMstrings: function () {
            return DOMstrings;
        },


    };

})();


// Global controller
let controller = (function (dateCtrl, UICtrl) {

    let setupEventListeners = function () {
        let DOM = UICtrl.getDOMstrings();
        document.querySelector(DOM.prevMonth).addEventListener('click', prevMonth);
        document.querySelector(DOM.nextMonth).addEventListener('click', nextMonth);
        document.querySelector(DOM.yearIncrease).addEventListener('click', yearIncrease);
        document.querySelector(DOM.yearDecrease).addEventListener('click', yearDecrease);
    };
   
    let prevMonth = function (){
        console.log('prevMonth Clicked !!');
    };

    let nextMonth = function (){
        console.log('nextMonth Clicked !!');
    };

    let yearIncrease = function (){
        console.log('yearIncrease Clicked !!');
    };

    let yearDecrease = function (){
        console.log('yearDecrease Clicked !!');
    };
  
  
    return {
        init: function () {
            console.log('Application has started.');
            UICtrl.initDatePicker(dateCtrl.getCurrentMonthDetails());
            setupEventListeners();
        }
    };

})(datePickerController, UIController);


controller.init();