import { PREFIX } from "./utils/config";
import { NOOP } from "./utils/functions";
import { isElement, trackDocumentClick } from "./utils/dom";
import getCloset from "./utils/get-closest";

const DatePicker = function () {
    // DatePicker Controller

    const datePickerController = (function () {

        let currDateObj = {};

        const createDateObject = function (date) {
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
    const UIController = (function () {
        const weekDays = ['S', 'M', 'T', 'W', 'Th', 'F', 'S'];
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        const DOMstrings = {
            showDateContainer: 'hcl-datePicker-panel-show',
            dateSelected: 'hcl-datePicker-date-picked', // need to work hcl-datePicker-dates
            todayHighlight: 'hcl-datePicker-dates-today',
            dateUnSelected: 'hcl-datePicker-date', // need to work  hcl-datePicker-dates
            showErrorDiv: 'hcl-datePicker-error-show',
            addErrorBorder: 'hcl-datePicker-container-error'
        };

        const DOMids = {
            inputCalSVG: 'hcl-datePicker-container-svg',
            prevMonth: 'hcl-datePicker-month-prev',
            yearInput: 'hcl-datePicker-year-input',
            nextMonth: 'hcl-datePicker-month-next',
            inputDate: 'hcl-datePicker-input',
            weekDaysPanel: 'hcl-datePicker-days',
            datePanel: 'hcl-datePicker-dates',
            yearIncrease: 'hcl-datePicker-up',
            yearDecrease: 'hcl-datePicker-down',
            monthInput: 'hcl-datePicker-curMonth',
            dateContainer: 'hcl-datePicker-panel',
            errorDiv: 'hcl-datePicker-error',
        }

        const getDaysInMonth = function (month, year) {
            return new Date(year, month, 0).getDate();
        };


        const initWeekDaysPanel = function () {

            let tempHtml = '<span>%weekDay%</span>';
            let element = DOMids.weekDaysPanel;
            weekDays.forEach((weekDay) => {
                let weekDayHTML = tempHtml.replace('%weekDay%', weekDay);
                document.getElementById(element).insertAdjacentHTML('beforeend', weekDayHTML);
            });
        };

        const initDatePanel = function (curMonthObj) {

            let numOfDaysInMonth = getDaysInMonth(curMonthObj.month + 1, curMonthObj.year);
            let tempHtml = `<span class="${DOMstrings.dateUnSelected}" id="%month%/%day%/%year%">%day% </span>`;
            let element = DOMids.datePanel;

            //days from previous month

            let numOfDaysFromPrevMonth = curMonthObj.day - curMonthObj.date % 7;
            numOfDaysFromPrevMonth = numOfDaysFromPrevMonth < 0 ? 7 + numOfDaysFromPrevMonth : numOfDaysFromPrevMonth;
            let numOfDaysInPrevMonth = getDaysInMonth(curMonthObj.month === 0 ? 12 : curMonthObj.month, curMonthObj.month === 0 ? curMonthObj.year - 1 : curMonthObj.year);

            for (let i = numOfDaysInPrevMonth - numOfDaysFromPrevMonth; i <= numOfDaysInPrevMonth && numOfDaysFromPrevMonth !== 6; i++) {
                let dayHTML = tempHtml.replaceAll('%day%', ('0' + String(i)).slice(-2));
                dayHTML = dayHTML.replaceAll('%month%', ('0' + (curMonthObj.month === 0 ? 12 : curMonthObj.month)).slice(-2));
                dayHTML = dayHTML.replaceAll('%year%', curMonthObj.month === 0 ? curMonthObj.year - 1 : curMonthObj.year);
                document.getElementById(element).insertAdjacentHTML('beforeend', dayHTML);
            }

            // days from current month
            for (let i = 1; i <= numOfDaysInMonth; i++) {
                let dayHTML = tempHtml.replaceAll('%day%', ('0' + String(i)).slice(-2));
                dayHTML = dayHTML.replaceAll('%month%', ('0' + (Number(curMonthObj.month) + 1)).slice(-2));
                dayHTML = dayHTML.replaceAll('%year%', curMonthObj.year);
                document.getElementById(element).insertAdjacentHTML('beforeend', dayHTML);
            }

            // days from next month  
            let numOfDaysFromNextMonth = numOfDaysFromPrevMonth === 6 ? 42 - numOfDaysInMonth + 1 : 42 - numOfDaysInMonth - numOfDaysFromPrevMonth;
            for (let i = 1; i < numOfDaysFromNextMonth; i++) {
                let dayHTML = tempHtml.replaceAll('%day%', ('0' + String(i)).slice(-2));
                dayHTML = dayHTML.replaceAll('%month%', ('0' + (Number(curMonthObj.month === 11 ? -1 : curMonthObj.month) + 2)).slice(-2));
                dayHTML = dayHTML.replaceAll('%year%', curMonthObj.month === 11 ? curMonthObj.year + 1 : curMonthObj.year);
                document.getElementById(element).insertAdjacentHTML('beforeend', dayHTML);
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

        const initMonthYearPanel = function (curMonthObj) {
            document.getElementById(DOMids.monthInput).innerHTML = months[curMonthObj.month];
            document.getElementById(DOMids.yearInput).value = String(curMonthObj.year);
        };

        const hightlightSelectedDate = function (id) {
            let elm = document.getElementById(document.getElementById(DOMids.inputDate).value);
            elm ? elm.classList.replace(DOMstrings.dateSelected, DOMstrings.dateUnSelected) : null;
            document.getElementById(id).classList.replace(DOMstrings.dateUnSelected, DOMstrings.dateSelected);
        }

        return {
            initDatePicker: function (curMonthObj) {
                initWeekDaysPanel();
                initDatePanel(curMonthObj);
                initMonthYearPanel(curMonthObj);
            },

            initMonthYearPanel: function (curMonthObj) {
                initMonthYearPanel(curMonthObj);
            },

            initDatePanel: function (curMonthObj) {
                initDatePanel(curMonthObj);
                let elm = document.getElementById(document.getElementById(DOMids.inputDate).value);
                elm ? elm.classList.replace(DOMstrings.dateUnSelected, DOMstrings.dateSelected) : null;
            },

            getDOMstrings: function () {
                return DOMstrings;
            },

            getDOMids: function () {
                return DOMids;
            },

            removeExistingDates: function () {
                let element = DOMids.datePanel;
                document.getElementById(element).innerHTML = "";
            },
            showDateContainer: function () {
                document.getElementById(DOMids.dateContainer).classList.add(DOMstrings.showDateContainer);
            },
            selectDate: function (event) {
                console.log('selectDate!!!' + event.target.id);
                console.log(event.targetß);
                document.getElementById(DOMids.inputDate).classList.remove(DOMstrings.addErrorBorder);
                document.getElementById(DOMids.errorDiv).classList.remove(DOMstrings.showErrorDiv);
                hightlightSelectedDate(event.target.id);
                document.getElementById(DOMids.inputDate).value = event.target.id;
            },
            hightlightSelectedDate: function (id) {
                hightlightSelectedDate(id);
            },

            hideDateContainer: function () {
                let element = DOMids.dateContainer;
                document.getElementById(element).classList.remove(DOMstrings.showDateContainer);
            },
            showErrorInvalidDate: function () {
                console.log('showErrorInvalidDate');
                document.getElementById(DOMids.errorDiv).classList.add(DOMstrings.showErrorDiv);
                document.getElementById(DOMids.inputDate).classList.add(DOMstrings.addErrorBorder);

            },
            hideErrorInvalidDate: function () {
                document.getElementById(DOMids.inputDate).classList.remove(DOMstrings.addErrorBorder);
                document.getElementById(DOMids.errorDiv).classList.remove(DOMstrings.showErrorDiv);

            }
        };
    })();


    // Main controller
    const controller = (function (dateCtrl, UICtrl) {

        const setupEventListeners = function () {
            let DOM = UICtrl.getDOMstrings();
            let DOMids = UICtrl.getDOMids();

            document.getElementById(DOMids.prevMonth).addEventListener('click', prevMonth);
            document.getElementById(DOMids.nextMonth).addEventListener('click', nextMonth);
            document.getElementById(DOMids.yearDecrease).addEventListener('click', yearDecrease);
            document.getElementById(DOMids.yearIncrease).addEventListener('click', yearIncrease);
            document.getElementById(DOMids.inputDate).addEventListener('click', UICtrl.showDateContainer);
            document.getElementById(DOMids.inputDate).addEventListener('change', dateChangeHandler);
            document.getElementById(DOMids.inputCalSVG).addEventListener('click', UICtrl.showDateContainer);
            document.getElementById(DOMids.yearInput).addEventListener('change', yearChangeHandler);

            let dateElement = document.getElementById(DOMids.datePanel).children;

            for (let i = 0; i < dateElement.length; i++) {
                dateElement[i].addEventListener('click', UICtrl.selectDate);
            }
        };

        const yearChangeHandler = function (event) {
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

        const dateChangeHandler = function (event) {
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


        const prevMonth = function () {
            event.stopPropagation();
            event.preventDefault();
            let prevMonthObj = dateCtrl.getPrevMonthDetails();
            UICtrl.removeExistingDates();
            UICtrl.initMonthYearPanel(prevMonthObj);
            UICtrl.initDatePanel(prevMonthObj);
            setupEventListeners();
        };

        const nextMonth = function () {
            event.stopPropagation();
            event.preventDefault();
            let nextMonObj = dateCtrl.getNextMonthDetails();
            UICtrl.removeExistingDates();
            UICtrl.initMonthYearPanel(nextMonObj);
            UICtrl.initDatePanel(nextMonObj);
            setupEventListeners();
        };

        const yearIncrease = function () {
            event.stopPropagation();
            event.preventDefault();
            let incYearMonObj = dateCtrl.getYearIncreaseMonthDetails();
            UICtrl.removeExistingDates();
            UICtrl.initMonthYearPanel(incYearMonObj);
            UICtrl.initDatePanel(incYearMonObj);
            setupEventListeners();
        };

        const yearDecrease = function () {
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
    console.log('this.element', this);
    controller.init();
};
export default DatePicker;


