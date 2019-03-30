"use strict";

// DatePicker Controller
let datePickerController = (function () {

    let currDateObj = {};

    return {
        getCurrentMonthDetails: function () {
            let date = new Date();
            currDateObj = {
                'day': date.getDay(),
                'month': date.getMonth(),
                'date': date.getDate(),
                'year': date.getFullYear(),
            };
            return currDateObj;
        },
        getPrevMonthDetails: function () {
            let date = new Date(currDateObj.month === 0 ? currDateObj.year - 1 : currDateObj.year, currDateObj.month === 0 ? 11 : currDateObj.month - 1, 15);
            currDateObj = {
                'day': date.getDay(),
                'month': date.getMonth(),
                'date': date.getDate(),
                'year': date.getFullYear(),
            };
            return currDateObj;
        },

        getNextMonthDetails: function () {
            let date = new Date(currDateObj.month === 11 ? currDateObj.year + 1 : currDateObj.year, currDateObj.month === 11 ? 0 : currDateObj.month + 1, 15);
            currDateObj = {
                'day': date.getDay(),
                'month': date.getMonth(),
                'date': date.getDate(),
                'year': date.getFullYear(),
            };
            return currDateObj;
        },
        getYearIncreaseMonthDetails: function () {
            let date = new Date(currDateObj.year + 1, currDateObj.month, 15);
            currDateObj = {
                'day': date.getDay(),
                'month': date.getMonth(),
                'date': date.getDate(),
                'year': date.getFullYear(),
            };
            return currDateObj;
        },
        getYearDecreaseMonthDetails: function () {
            let date = new Date(currDateObj.year - 1, currDateObj.month, 15);
            currDateObj = {
                'day': date.getDay(),
                'month': date.getMonth(),
                'date': date.getDate(),
                'year': date.getFullYear(),
            };
            return currDateObj;
        },
    };

})();


// UI Controller
let UIController = (function () {
    let weekDays = ['S', 'M', 'T', 'W', 'Th', 'F', 'S'];
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    let DOMstrings = {
        weekDaysPanel: '.hcl-datePicker-panel-week',
        DatePanel: '.hcl-datePicker-panel-days',
        prevMonth: '.hcl-datePicker-panel-month-prev',
        nextMonth: '.hcl-datePicker-panel-month-next',
        yearIncrease: '.hcl-datePicker-panel-month-selection-inputWrapper-arrows-up',
        yearDecrease: '.hcl-datePicker-panel-month-selection-inputWrapper-arrows-down',
        yearInput: '.hcl-datePicker-panel-month-selection-inputWrapper-input',
        monthInput: '.hcl-datePicker-panel-month-selection-curMonth'
    };

    let getDaysInMonth = function (month, year) {
        return new Date(year, month, 0).getDate();
    };


    let initweekDaysPanel = function () {

        let html = '<span class="">%weekDay%</span>';
        let element = DOMstrings.weekDaysPanel;
        weekDays.forEach((weekDay) => {
            let weekDayHTML = html.replace('%weekDay%', weekDay);
            document.querySelector(element).insertAdjacentHTML('beforeend', weekDayHTML);
        });
    };

    let initDatePanel = function (curMonthObj) {

        let numOfDaysInMonth = getDaysInMonth(curMonthObj.month + 1, curMonthObj.year);
        let html = '<span id="hcl-datePicker-%day%">%day%</span>';
        let element = DOMstrings.DatePanel;

        //days from previous month

        let numOfDaysFromPrevMonth = curMonthObj.day - curMonthObj.date % 7;  // Need to be shown in datePicker
        numOfDaysFromPrevMonth = numOfDaysFromPrevMonth < 0 ? 7 + numOfDaysFromPrevMonth : numOfDaysFromPrevMonth;
        let numOfDaysInPrevMonth = getDaysInMonth(curMonthObj.month === 0 ? 12 : curMonthObj.month, curMonthObj.month === 0 ? curMonthObj.year - 1 : curMonthObj.year);

        for (let i = numOfDaysInPrevMonth - numOfDaysFromPrevMonth; i <= numOfDaysInPrevMonth && numOfDaysFromPrevMonth !== 6; i++) {
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

    let initMonthYearPanel = function (curMonthObj) {
        let monthElm = DOMstrings.monthInput;
        let yearElm = DOMstrings.yearInput;
        document.querySelector(monthElm).innerHTML = months[curMonthObj.month];
        document.querySelector(yearElm).value = String(curMonthObj.year);
    };

    return {
        initDatePicker: function (curMonthObj) {
            initweekDaysPanel();
            initDatePanel(curMonthObj);
            initMonthYearPanel(curMonthObj);
        },

        initMonthYearPanel: function (curMonthObj) {
            initMonthYearPanel(curMonthObj);
        },

        initDatePanel: function (curMonthObj) {
            initDatePanel(curMonthObj);
        },

        getDOMstrings: function () {
            return DOMstrings;
        },

        removeExistingDates: function () {
            let element = DOMstrings.DatePanel;
            document.querySelector(element).innerHTML = "";
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

    let prevMonth = function () {
        console.log('prevMonth Clicked !!');
        let prevMonthObj = dateCtrl.getPrevMonthDetails();
        UICtrl.removeExistingDates();
        UICtrl.initMonthYearPanel(prevMonthObj);
        UICtrl.initDatePanel(prevMonthObj);
    };

    let nextMonth = function () {
        console.log('nextMonth Clicked !!');
        let nextMonObj = dateCtrl.getNextMonthDetails();
        UICtrl.removeExistingDates();
        UICtrl.initMonthYearPanel(nextMonObj);
        UICtrl.initDatePanel(nextMonObj);
    };

    let yearIncrease = function () {
        console.log('yearIncrease Clicked !!');
        let incYearMonObj = dateCtrl.getYearIncreaseMonthDetails();
        UICtrl.removeExistingDates();
        UICtrl.initMonthYearPanel(incYearMonObj);
        UICtrl.initDatePanel(incYearMonObj);
    };

    let yearDecrease = function () {
        console.log('yearDecrease Clicked !!');
        let decYearMonObj = dateCtrl.getYearDecreaseMonthDetails();
        UICtrl.removeExistingDates();
        UICtrl.initMonthYearPanel(decYearMonObj);
        UICtrl.initDatePanel(decYearMonObj);
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