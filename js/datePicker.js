import { PREFIX, weekDays, months } from "./utils/config";

const DatePicker = function (datePickerElm) {
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

        const DOMstrings = {
            showDateContainer: `${PREFIX}-datePicker-panel-show`,
            dateSelected: `${PREFIX}-datePicker-date-picked`,
            datePicked: `${PREFIX}-datePicker-date-picked`,
            todayHighlight: `${PREFIX}-datePicker-dates-today`,
            dateUnSelected: `${PREFIX}-datePicker-date`,
            showErrorDiv: `${PREFIX}-datePicker-error-show`,
            addErrorBorder: `${PREFIX}-datePicker-container-error`,
            inputCalSVG: `.${PREFIX}-datePicker-container-svg`,
            prevMonth: `.${PREFIX}-datePicker-month-prev`,
            yearInput: `.${PREFIX}-datePicker-year-input`,
            nextMonth: `.${PREFIX}-datePicker-month-next`,
            inputDate: `.${PREFIX}-datePicker-input`,
            weekDaysPanel: `.${PREFIX}-datePicker-days`,
            datePanel: `.${PREFIX}-datePicker-dates`,
            yearIncrease: `.${PREFIX}-datePicker-up`,
            yearDecrease: `.${PREFIX}-datePicker-down`,
            monthInput: `.${PREFIX}-datePicker-curMonth`,
            dateContainer: `.${PREFIX}-datePicker-panel`,
            errorDiv: `.${PREFIX}-datePicker-error`,
            fade: `${PREFIX}-datePicker-date-fade`,
        };

        const getDaysInMonth = function (month, year) {
            return new Date(year, month, 0).getDate();
        };

        const initWeekDaysPanel = function () {
            weekDays.forEach((weekDay) => {
                datePickerElm.querySelector(DOMstrings.weekDaysPanel).insertAdjacentHTML('beforeend', `<span>${weekDay}</span>`);
            });
        };

        const createDayHTML = function (type, i, curMonthObj) {
            let month, year;
            let day = ('0' + String(i)).slice(-2);
            switch (type) {
                case 'previous':
                    month = ('0' + (curMonthObj.month === 0 ? 12 : curMonthObj.month)).slice(-2);
                    year = curMonthObj.month === 0 ? curMonthObj.year - 1 : curMonthObj.year;
                    break;
                case 'current':
                    month = ('0' + (Number(curMonthObj.month) + 1)).slice(-2);
                    year = curMonthObj.year;
                    break;
                case 'next':
                    month = ('0' + (Number(curMonthObj.month === 11 ? -1 : curMonthObj.month) + 2)).slice(-2);
                    year = curMonthObj.month === 11 ? curMonthObj.year + 1 : curMonthObj.year;
            }
            return `<span class="${DOMstrings.dateUnSelected} ${type !== 'current' ? DOMstrings.fade : ''}" date="${month}/${day}/${year}">${day} </span>`;
        };

        const initDatePanel = function (curMonthObj) {
            let numOfDaysInMonth = getDaysInMonth(curMonthObj.month + 1, curMonthObj.year);
            let element = DOMstrings.datePanel;
            let numOfDaysFromPrevMonth = curMonthObj.day - curMonthObj.date % 7;
            numOfDaysFromPrevMonth = numOfDaysFromPrevMonth < 0 ? 7 + numOfDaysFromPrevMonth : numOfDaysFromPrevMonth;
            let numOfDaysInPrevMonth = getDaysInMonth(curMonthObj.month === 0 ? 12 : curMonthObj.month, curMonthObj.month === 0 ? curMonthObj.year - 1 : curMonthObj.year);

            //days from previous month
            for (let i = numOfDaysInPrevMonth - numOfDaysFromPrevMonth; i <= numOfDaysInPrevMonth && numOfDaysFromPrevMonth !== 6; i++) {
                datePickerElm.querySelector(element).insertAdjacentHTML('beforeend', createDayHTML('previous', i, curMonthObj));
            }
            // days from current month
            for (let i = 1; i <= numOfDaysInMonth; i++) {
                datePickerElm.querySelector(element).insertAdjacentHTML('beforeend', createDayHTML('current', i, curMonthObj));
            }
            // days from next month  
            let numOfDaysFromNextMonth = numOfDaysFromPrevMonth === 6 ? 42 - numOfDaysInMonth + 1 : 42 - numOfDaysInMonth - numOfDaysFromPrevMonth;
            for (let i = 1; i < numOfDaysFromNextMonth; i++) {
                datePickerElm.querySelector(element).insertAdjacentHTML('beforeend', createDayHTML('next', i, curMonthObj));
            }
            // hightlight today's Date
            let todayDate = new Date();
            todayDate = `${('0' + (todayDate.getMonth() + 1)).slice(-2)}/${('0' + todayDate.getDate()).slice(-2)}/${todayDate.getFullYear()}`;
            const selector = `[date='${todayDate}']`;
            datePickerElm.querySelector(selector) ? datePickerElm.querySelector(selector).classList.add(DOMstrings.todayHighlight) : null;
        };

        String.prototype.replaceAll = function (search, replacement) {
            let target = this;
            return target.split(search).join(replacement);
        };

        const initMonthYearPanel = function (curMonthObj) {
            datePickerElm.querySelector(DOMstrings.monthInput).innerHTML = months[curMonthObj.month];
            datePickerElm.querySelector(DOMstrings.yearInput).value = String(curMonthObj.year);
        };

        const hightlightSelectedDate = function (id) {
            const elm = datePickerElm.querySelector(`.${DOMstrings.datePicked}`);
            elm ? elm.classList.remove(DOMstrings.datePicked) : null;
            const selector = `[date='${id}']`;
            datePickerElm.querySelector(selector) ? datePickerElm.querySelector(selector).classList.add(DOMstrings.datePicked) : null;
        };

        const showErrorInvalidDate = function () {
            datePickerElm.querySelector(DOMstrings.errorDiv).classList.add(DOMstrings.showErrorDiv);
            datePickerElm.querySelector(DOMstrings.inputDate).classList.add(DOMstrings.addErrorBorder);

        };
        const hideErrorInvalidDate = function () {
            datePickerElm.querySelector(DOMstrings.inputDate).classList.remove(DOMstrings.addErrorBorder);
            datePickerElm.querySelector(DOMstrings.errorDiv).classList.remove(DOMstrings.showErrorDiv);

        };

        const hideDateContainer = function () {
            datePickerElm.querySelector(DOMstrings.dateContainer).classList.remove(DOMstrings.showDateContainer);
        };

        const toggleDateContainer = function () {
            datePickerElm.querySelector(DOMstrings.dateContainer).classList.toggle(DOMstrings.showDateContainer);
        };

        const removeExistingDates = function () {
            let element = DOMstrings.datePanel;
            datePickerElm.querySelector(element).innerHTML = "";
        };

        const selectDate = function (event) {
            hightlightSelectedDate(event.target.getAttribute('date'));
            hideErrorInvalidDate();
            datePickerElm.querySelector(DOMstrings.inputDate).value = event.target.getAttribute('date');
            hideDateContainer();
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
                hightlightSelectedDate(datePickerElm.querySelector(DOMstrings.inputDate).value);
            },

            getDOMstrings: function () {
                return DOMstrings;
            },

            removeExistingDates: function () {
                removeExistingDates();
            },

            toggleDateContainer: function () {
                toggleDateContainer();
            },

            hideDateContainer: function () {
                hideDateContainer();
            },

            selectDate: function (event) {
                selectDate(event);
            },

            hightlightSelectedDate: function (id) {
                hightlightSelectedDate(id);
            },

            showErrorInvalidDate: function () {
                showErrorInvalidDate();
            },

            hideErrorInvalidDate: function () {
                hideErrorInvalidDate();

            }
        };
    })();


    // Main controller
    const controller = (function (dateCtrl, UICtrl) {
        let DOMstrings = UICtrl.getDOMstrings();
        const setupEventListeners = function () {
            datePickerElm.querySelector(DOMstrings.prevMonth).addEventListener('click', prevMonth);
            datePickerElm.querySelector(DOMstrings.nextMonth).addEventListener('click', nextMonth);
            datePickerElm.querySelector(DOMstrings.yearDecrease).addEventListener('click', yearDecrease);
            datePickerElm.querySelector(DOMstrings.yearIncrease).addEventListener('click', yearIncrease);
            datePickerElm.querySelector(DOMstrings.inputDate).addEventListener('click', UICtrl.toggleDateContainer);
            datePickerElm.querySelector(DOMstrings.inputDate).addEventListener('change', dateChangeHandler);
            datePickerElm.querySelector(DOMstrings.inputCalSVG).addEventListener('click', UICtrl.toggleDateContainer);
            datePickerElm.querySelector(DOMstrings.yearInput).addEventListener('change', yearChangeHandler);
            bindDateEvent();
        };

        const bindDateEvent = function () {
            let dateElement = datePickerElm.querySelector(DOMstrings.datePanel).children;
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
                UICtrl.showErrorInvalidDate();
            }
        };

        const dateChangeHandler = function (event) {
            let regex = /^[0-9]{2}[\/][0-9]{2}[\/][0-9]{4}$/g;
            let validDate = regex.test(event.target.value);
            UICtrl.hideDateContainer();
            if (validDate) {
                let currDateObj = dateCtrl.setDateObject(event.target.value);
                UICtrl.removeExistingDates();
                UICtrl.initDatePanel(currDateObj);
                UICtrl.initMonthYearPanel(currDateObj);
                UICtrl.hightlightSelectedDate(event.target.value);
                UICtrl.hideErrorInvalidDate();
                bindDateEvent();
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
    controller.init();
};
export default DatePicker;