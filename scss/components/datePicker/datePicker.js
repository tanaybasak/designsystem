"use strict";

// DatePicker Controller
let datePickerController = (function () {

    let currDateObj = {};

    let createDateObject = function (date) {
        currDateObj = {
            'day': date.getDay(),
            'month': date.getMonth(),
            'date': date.getDate(),
            'year': date.getFullYear(),
        };
        return currDateObj;
    };

    return {

        getCurrentMonthDetails: function () {
            let date = new Date();
            return createDateObject(date);
        },
        getPrevMonthDetails: function () {
            let date = new Date(currDateObj.month === 0 ? currDateObj.year - 1 : currDateObj.year, currDateObj.month === 0 ? 11 : currDateObj.month - 1, 15);
            return createDateObject(date);
        },

        getNextMonthDetails: function () {
            let date = new Date(currDateObj.month === 11 ? currDateObj.year + 1 : currDateObj.year, currDateObj.month === 11 ? 0 : currDateObj.month + 1, 15);
            return createDateObject(date);
        },
        getYearIncreaseMonthDetails: function () {
            let date = new Date(currDateObj.year + 1, currDateObj.month, 15);
            return createDateObject(date);
        },
        getYearDecreaseMonthDetails: function () {
            let date = new Date(currDateObj.year - 1, currDateObj.month, 15);
            return createDateObject(date);
        },

        setDateObject: function (date) {
            let dateArray = date.split('/');
            return createDateObject(new Date(dateArray[2], Number(dateArray[0]) - 1, dateArray[1]));
        },


        getDateObject: function () {
            return currDateObj;
        },

    };

})();


// UI Controller
let UIController = (function () {
    let weekDays = ['S', 'M', 'T', 'W', 'Th', 'F', 'S'];
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    let DOMstrings = {
        weekDaysPanel: '.hcl-datePicker-days',
        datePanel: '.hcl-datePicker-dates',
        // prevMonth: '.hcl-datePicker-month-prev',
        // nextMonth: '.hcl-datePicker-month-next',
        yearIncrease: '.hcl-datePicker-up',
        yearDecrease: '.hcl-datePicker-down',
        monthInput: '.hcl-datePicker-curMonth',
        // inputCalSVG: '.hcl-datePicker-container-svg',
        dateContainer: '.hcl-datePicker-panel',
        showDateContainer: 'hcl-datePicker-panel-show',
        dateSelected: 'hcl-datePicker-dates-selected', // need to work hcl-datePicker-dates
        todayHighlight: 'hcl-datePicker-dates-today',
        dateUnSelected: 'hcl-datePicker-dates-unSelected', // need to work  hcl-datePicker-dates
        overlayShow: 'hcl-datePicker-container-overlay-show',
        overlayLabel: ".hcl-datePicker-container-overlay",
        errorDiv: 'hcl-datePicker-error',
        showErrorDiv: 'hcl-datePicker-error-show',
        addErrorBorder: 'hcl-datePicker-container-error'

    };

    let DOMids = {
        inputCalSVG: 'hcl-datePicker-container-svg',
        prevMonth: 'hcl-datePicker-month-prev',
        yearInput: 'hcl-datePicker-year-input',
        nextMonth: 'hcl-datePicker-month-next',
        inputDate: 'hcl-datePicker-input',


    }

    let getDaysInMonth = function (month, year) {
        return new Date(year, month, 0).getDate();
    };


    let initweekDaysPanel = function () {

        let html = '<span>%weekDay%</span>';
        let element = DOMstrings.weekDaysPanel;
        weekDays.forEach((weekDay) => {
            let weekDayHTML = html.replace('%weekDay%', weekDay);
            document.querySelector(element).insertAdjacentHTML('beforeend', weekDayHTML);
        });
    };

    let initDatePanel = function (curMonthObj) {

        let numOfDaysInMonth = getDaysInMonth(curMonthObj.month + 1, curMonthObj.year);
        let html = `<span class="${DOMstrings.dateUnSelected}" id="%month%/%day%/%year%">%day% </span>`;
        let element = DOMstrings.datePanel;

        //days from previous month

        let numOfDaysFromPrevMonth = curMonthObj.day - curMonthObj.date % 7;
        numOfDaysFromPrevMonth = numOfDaysFromPrevMonth < 0 ? 7 + numOfDaysFromPrevMonth : numOfDaysFromPrevMonth;
        let numOfDaysInPrevMonth = getDaysInMonth(curMonthObj.month === 0 ? 12 : curMonthObj.month, curMonthObj.month === 0 ? curMonthObj.year - 1 : curMonthObj.year);

        for (let i = numOfDaysInPrevMonth - numOfDaysFromPrevMonth; i <= numOfDaysInPrevMonth && numOfDaysFromPrevMonth !== 6; i++) {
            let dayHTML = html.replaceAll('%day%', ('0' + String(i)).slice(-2));
            dayHTML = dayHTML.replaceAll('%month%', ('0' + (curMonthObj.month === 0 ? 12 : curMonthObj.month)).slice(-2));
            dayHTML = dayHTML.replaceAll('%year%', curMonthObj.month === 0 ? curMonthObj.year - 1 : curMonthObj.year);
            document.querySelector(element).insertAdjacentHTML('beforeend', dayHTML);
        }

        // days from current month
        for (let i = 1; i <= numOfDaysInMonth; i++) {
            let dayHTML = html.replaceAll('%day%', ('0' + String(i)).slice(-2));
            dayHTML = dayHTML.replaceAll('%month%', ('0' + (Number(curMonthObj.month) + 1)).slice(-2));
            dayHTML = dayHTML.replaceAll('%year%', curMonthObj.year);
            document.querySelector(element).insertAdjacentHTML('beforeend', dayHTML);
        }

        // days from next month  
        let numOfDaysFromNextMonth = numOfDaysFromPrevMonth === 6 ? 42 - numOfDaysInMonth + 1 : 42 - numOfDaysInMonth - numOfDaysFromPrevMonth;
        for (let i = 1; i < numOfDaysFromNextMonth; i++) {
            let dayHTML = html.replaceAll('%day%', ('0' + String(i)).slice(-2));
            dayHTML = dayHTML.replaceAll('%month%', ('0' + (Number(curMonthObj.month === 11 ? -1 : curMonthObj.month) + 2)).slice(-2));
            dayHTML = dayHTML.replaceAll('%year%', curMonthObj.month === 11 ? curMonthObj.year + 1 : curMonthObj.year);
            document.querySelector(element).insertAdjacentHTML('beforeend', dayHTML);
        }

        // hightlight today's Date
        let todayDate = new Date();
        todayDate = `${('0' + (todayDate.getMonth() + 1)).slice(-2)}/${('0' + todayDate.getDate()).slice(-2)}/${todayDate.getFullYear()}`;

        if (document.getElementById(todayDate)) {
            document.getElementById(todayDate).classList.add(DOMstrings.todayHighlight);
        }
    };

    String.prototype.replaceAll = function (search, replacement) {
        let target = this;
        return target.split(search).join(replacement);
    };

    let initMonthYearPanel = function (curMonthObj) {
        // let monthElm = DOMstrings.monthInput;
        // let yearElm = DOMids.yearInput;
        document.querySelector(DOMstrings.monthInput).innerHTML = months[curMonthObj.month];
        document.getElementById(DOMids.yearInput).value = String(curMonthObj.year);
    };

    let hightlightSelectedDate = function (id) {
        // need to check
        // if (document.getElementById(document.getElementById(DOMids.inputDate).value)) {
        //     document.getElementById(document.getElementById(DOMids.inputDate).value).classList.replace(DOMstrings.dateSelected, DOMstrings.dateUnSelected);
        // }
        // document.getElementById(id).classList.replace(DOMstrings.dateUnSelected, DOMstrings.dateSelected);

    }

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

        getDOMids: function () {
            return DOMids;
        },

        removeExistingDates: function () {
            let element = DOMstrings.datePanel;
            document.querySelector(element).innerHTML = "";
        },
        showDateContainer: function () {
            document.querySelector(DOMstrings.dateContainer).classList.add(DOMstrings.showDateContainer);
            document.querySelector(DOMstrings.overlayLabel).classList.add(DOMstrings.overlayShow);


        },
        selectDate: function (event) {
            console.log('selectDate!!!' + event.target.id);
            document.getElementById(DOMids.inputDate).classList.remove(DOMstrings.addErrorBorder);
            document.getElementById(DOMstrings.errorDiv).classList.remove(DOMstrings.showErrorDiv);
            hightlightSelectedDate(event.target.id)
            document.getElementById(DOMids.inputDate).value = event.target.id;
        },
        hightlightSelectedDate: function (id) {
            hightlightSelectedDate(id);
        },

        hideDateContainer: function () {
            let element = DOMstrings.dateContainer;
            document.querySelector(DOMstrings.overlayLabel).classList.remove(DOMstrings.overlayShow);
            document.querySelector(element).classList.remove(DOMstrings.showDateContainer);
        },
        showErrorInvalidDate: function () {
            document.getElementById(DOMstrings.errorDiv).classList.add(DOMstrings.showErrorDiv);
            document.getElementById(DOMids.inputDate).classList.add(DOMstrings.addErrorBorder);

        },
        hideErrorInvalidDate: function () {
            document.getElementById(DOMids.inputDate).classList.remove(DOMstrings.addErrorBorder);
            document.getElementById(DOMstrings.errorDiv).classList.remove(DOMstrings.showErrorDiv);

        }
    };
})();


// Main controller
let controller = (function (dateCtrl, UICtrl) {

    let setupEventListeners = function () {
        let DOM = UICtrl.getDOMstrings();
        let DOMids = UICtrl.getDOMids();
        if (document.getElementById(DOMids.prevMonth)) {
            document.getElementById(DOMids.prevMonth).addEventListener('click', prevMonth);
        } else {
            console.log("Error");
        }

        if (document.getElementById(DOMids.nextMonth)) {
            document.getElementById(DOMids.nextMonth).addEventListener('click', nextMonth);
        } else {
            console.log("Error");
        }
        if (document.querySelector(DOM.yearDecrease)) {
            document.querySelector(DOM.yearDecrease).addEventListener('click', yearDecrease);
        } else {
            console.log("Error");
        }
        if (document.querySelector(DOM.inputDate)) {
            document.querySelector(DOM.inputDate).addEventListener('click', UICtrl.showDateContainer);
        } else {
            console.log("Error");
        }
        if (document.querySelector(DOM.inputDate)) {
            document.querySelector(DOM.inputDate).addEventListener('change', dateChangeHandler);
        } else {
            console.log("Error");
        }
        if (document.getElementById(DOMids.inputCalSVG)) {
            document.getElementById(DOMids.inputCalSVG).addEventListener('click', UICtrl.showDateContainer);
        } else {
            console.log("Error");
        }
        if (document.getElementById(DOMids.yearInput)) {
            document.getElementById(DOMids.yearInput).addEventListener('change', yearChangeHandler);
        } else {
            console.log("Error");
        }
        // if (document.querySelector(DOM.overlayLabel)) {
        //     document.querySelector(DOM.overlayLabel).addEventListener('click', UICtrl.hideDateContainer);
        // } else {
        //     console.log("Error");
        // }

        let dateElement = document.querySelector(DOM.datePanel).children;

        for (let i = 0; i < dateElement.length; i++) {
            dateElement[i].addEventListener('click', UICtrl.selectDate);
        }
    };

    let yearChangeHandler = function (event) {
        let regex = /^[0-9]{4}$/g;
        let validYear = regex.test(event.target.value);

        if (validYear) {
            // set current Date;
            let currDateObj = dateCtrl.getDateObject();
            currDateObj = dateCtrl.setDateObject(`${currDateObj.month}/15/${event.target.value}`);
            UICtrl.removeExistingDates();
            UICtrl.initDatePanel(currDateObj);
            UICtrl.initMonthYearPanel(currDateObj);
            UICtrl.hideErrorInvalidDate();

        } else {
            console.log('Invalid Date')
            UICtrl.showErrorInvalidDate();
        }


    };

    let dateChangeHandler = function (event) {
        let regex = /^[0-9]{2}[\/][0-9]{2}[\/][0-9]{4}$/g;
        let validDate = regex.test(event.target.value);
        if (validDate) {
            let currDateObj = dateCtrl.setDateObject(event.target.value);
            UICtrl.removeExistingDates();
            UICtrl.initDatePanel(currDateObj);
            UICtrl.initMonthYearPanel(currDateObj);
            UICtrl.hightlightSelectedDate(event.target.value);
            UICtrl.hideErrorInvalidDate();

        } else {
            UICtrl.showErrorInvalidDate();
        }
    };


    let prevMonth = function () {
        event.stopPropagation();
        event.preventDefault();
        let prevMonthObj = dateCtrl.getPrevMonthDetails();
        UICtrl.removeExistingDates();
        UICtrl.initMonthYearPanel(prevMonthObj);
        UICtrl.initDatePanel(prevMonthObj);
        setupEventListeners();
    };

    let nextMonth = function () {
        event.stopPropagation();
        event.preventDefault();
        let nextMonObj = dateCtrl.getNextMonthDetails();
        UICtrl.removeExistingDates();
        UICtrl.initMonthYearPanel(nextMonObj);
        UICtrl.initDatePanel(nextMonObj);
        setupEventListeners();
    };

    let yearIncrease = function () {
        event.stopPropagation();
        event.preventDefault();
        let incYearMonObj = dateCtrl.getYearIncreaseMonthDetails();
        UICtrl.removeExistingDates();
        UICtrl.initMonthYearPanel(incYearMonObj);
        UICtrl.initDatePanel(incYearMonObj);
        setupEventListeners();
    };

    let yearDecrease = function () {
        event.stopPropagation();
        event.preventDefault();
        let decYearMonObj = dateCtrl.getYearDecreaseMonthDetails();
        UICtrl.removeExistingDates();
        UICtrl.initMonthYearPanel(decYearMonObj);
        UICtrl.initDatePanel(decYearMonObj);
        setupEventListeners();
    };


    return {
        init: function () {
            UICtrl.initDatePicker(dateCtrl.getCurrentMonthDetails());
            setupEventListeners();
        }
    };

})(datePickerController, UIController);

controller.init();