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
        weekDaysPanel: '.hcl-datePicker-container-panel-weekDays',
        datePanel: '.hcl-datePicker-container-panel-dates',
        prevMonth: '.hcl-datePicker-container-panel-month-prev',
        nextMonth: '.hcl-datePicker-container-panel-month-next',
        yearIncrease: '.hcl-datePicker-container-panel-month-selection-inputWrapper-arrows-up',
        yearDecrease: '.hcl-datePicker-container-panel-month-selection-inputWrapper-arrows-down',
        yearInput: '.hcl-datePicker-container-panel-month-selection-inputWrapper-input',
        monthInput: '.hcl-datePicker-container-panel-month-selection-curMonth',
        inputDate: '.hcl-datePicker-input',
        inputCalSVG: '.hcl-datePicker-container-svg',
        dateContainer: '.hcl-datePicker-container-panel',
        showDateContainer: 'hcl-datePicker-container-panel-show',
        dateSelected: 'hcl-datePicker-container-panel-dates-selected'
    };

    let getDaysInMonth = function (month, year) {
        return new Date(year, month, 0).getDate();
    };


    let initweekDaysPanel = function () {

        let html = '<span class="hcl-datePicker-container-panel-weekDays-day">%weekDay%</span>';
        let element = DOMstrings.weekDaysPanel;
        weekDays.forEach((weekDay) => {
            let weekDayHTML = html.replace('%weekDay%', weekDay);
            document.querySelector(element).insertAdjacentHTML('beforeend', weekDayHTML);
        });
    };

    let initDatePanel = function (curMonthObj) {

        let numOfDaysInMonth = getDaysInMonth(curMonthObj.month + 1, curMonthObj.year);
        let html = '<span id="%month%/%day%/%year%">%day%</span>';
        let element = DOMstrings.datePanel;

        //days from previous month

        let numOfDaysFromPrevMonth = curMonthObj.day - curMonthObj.date % 7;  // Need to be shown in datePicker
        numOfDaysFromPrevMonth = numOfDaysFromPrevMonth < 0 ? 7 + numOfDaysFromPrevMonth : numOfDaysFromPrevMonth;
        let numOfDaysInPrevMonth = getDaysInMonth(curMonthObj.month === 0 ? 12 : curMonthObj.month, curMonthObj.month === 0 ? curMonthObj.year - 1 : curMonthObj.year);

        for (let i = numOfDaysInPrevMonth - numOfDaysFromPrevMonth; i <= numOfDaysInPrevMonth && numOfDaysFromPrevMonth !== 6; i++) {
            let dayHTML = html.replaceAll('%day%', ('0' + String(i)).slice(-2));
            dayHTML = dayHTML.replaceAll('%month%', ('0' + curMonthObj.month).slice(-2));
            dayHTML = dayHTML.replaceAll('%year%', curMonthObj.year); // need to handle Jan start edge cases
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
        for (let i = 1; i < 42 - numOfDaysInMonth - numOfDaysFromPrevMonth; i++) {
            let dayHTML = html.replaceAll('%day%', ('0' + String(i)).slice(-2));
            dayHTML = dayHTML.replaceAll('%month%', ('0' + (Number(curMonthObj.month) + 2)).slice(-2));
            dayHTML = dayHTML.replaceAll('%year%', curMonthObj.year); // need to handle Dec last edge cases
            document.querySelector(element).insertAdjacentHTML('beforeend', dayHTML);
        }

        // hightlight today's Date
        
        let todayDate = new Date(); //('0' + (todayDate.getMonth()+1)).slice(-2)
        todayDate = `${('0' + (todayDate.getMonth()+1)).slice(-2)}/${todayDate.getDate()}/${todayDate.getFullYear()}`;
        document.getElementById(todayDate)
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
            let element = DOMstrings.datePanel;
            document.querySelector(element).innerHTML = "";
        },
        showDateContainer: function () {
            let element = DOMstrings.dateContainer;
            document.querySelector(element).classList.add(DOMstrings.showDateContainer)
        },
        selectDate: function (event) {
            console.log('selectDate!!!' + event.target.id);
            // remove highlight class if date is selected
            // add highlist class to newly selected date 
            document.getElementById(event.target.id).classList.add(DOMstrings.dateSelected);
            // set value to input date field 
            document.querySelector(DOMstrings.inputDate).value = event.target.id;


        },

        // validateDate: function (event) {
        //     console.log('event --->>', event);
        //     let regex = /^[0-9]{2}[\/][0-9]{2}[\/][0-9]{4}$/g;
        //     let validDate = regex.test(event.target.value);
        //     if (validDate) {
        //         console.log('Valid Date')
        //         // call select data and bring month date year into view
        //     } else {
        //         console.log('Invalid Date')
        //         // show warning label
        //     }
        // }

    };

})();


// Main controller
let controller = (function (dateCtrl, UICtrl) {

    let setupEventListeners = function () {
        let DOM = UICtrl.getDOMstrings();
        document.querySelector(DOM.prevMonth).addEventListener('click', prevMonth);
        document.querySelector(DOM.nextMonth).addEventListener('click', nextMonth);
        document.querySelector(DOM.yearIncrease).addEventListener('click', yearIncrease);
        document.querySelector(DOM.yearDecrease).addEventListener('click', yearDecrease);
        document.querySelector(DOM.inputDate).addEventListener('click', UICtrl.showDateContainer);
        document.querySelector(DOM.inputDate).addEventListener('change', dateChangeHandler);
        document.querySelector(DOM.inputCalSVG).addEventListener('click', UICtrl.showDateContainer);
        document.querySelector(DOM.yearInput).addEventListener('change', yearChangeHandler);
        let dateElement = document.querySelector(DOM.datePanel).children;

        for (let i = 0; i < dateElement.length; i++) {
            dateElement[i].addEventListener('click', UICtrl.selectDate);
        }

        // document.getElementsByClassName(DOM.datePanel).children.forEach((node,index) =>{

        //   if(index !== 0){
        //       console.log('index',index)
        //     node.addEventListener('click', UICtrl.selectDate(node.id));
        //   }   
        // });;


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


            //  UICtrl.initDatePicker(dateCtrl.getCurrentMonthDetails()); // set and get current Date Obj 
            // call select data and bring month date year into view
        } else {
            console.log('Invalid Date')
            // show warning label
        }


    };

    let dateChangeHandler = function (event) {
        let regex = /^[0-9]{2}[\/][0-9]{2}[\/][0-9]{4}$/g;
        let validDate = regex.test(event.target.value);
        if (validDate) {
            console.log('Valid Date');
            // set current Date;
            let currDateObj = dateCtrl.setDateObject(event.target.value)
            UICtrl.removeExistingDates();
            UICtrl.initDatePanel(currDateObj);
            UICtrl.initMonthYearPanel(currDateObj);


            //  UICtrl.initDatePicker(dateCtrl.getCurrentMonthDetails()); // set and get current Date Obj 
            // call select data and bring month date year into view
        } else {
            console.log('Invalid Date')
            // show warning label
        }


    };


    let prevMonth = function () {
        console.log('prevMonth Clicked !!');
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
        console.log('nextMonth Clicked !!');
        let nextMonObj = dateCtrl.getNextMonthDetails();
        UICtrl.removeExistingDates();
        UICtrl.initMonthYearPanel(nextMonObj);
        UICtrl.initDatePanel(nextMonObj);
        setupEventListeners();
    };

    let yearIncrease = function () {
        event.stopPropagation();
        event.preventDefault();
        console.log('yearIncrease Clicked !!');
        let incYearMonObj = dateCtrl.getYearIncreaseMonthDetails();
        UICtrl.removeExistingDates();
        UICtrl.initMonthYearPanel(incYearMonObj);
        UICtrl.initDatePanel(incYearMonObj);
        setupEventListeners();
    };

    let yearDecrease = function () {
        event.stopPropagation();
        event.preventDefault();
        console.log('yearDecrease Clicked !!');
        let decYearMonObj = dateCtrl.getYearDecreaseMonthDetails();
        UICtrl.removeExistingDates();
        UICtrl.initMonthYearPanel(decYearMonObj);
        UICtrl.initDatePanel(decYearMonObj);
        setupEventListeners();
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