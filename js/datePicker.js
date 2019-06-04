import { PREFIX, weekDays, months } from "./utils/config";
import { trackDocumentClick } from "./utils/dom";
import handleDataBinding from "./utils/data-api";

class DatePicker {
    constructor(element) {
        this.datePickerElm = element;
    }
    // DatePicker Controller
    datePickerController = () => {
        let currDateObj = {};
        const createDateObject = (date) => {
            currDateObj = {
                'day': date.getDay(),
                'month': date.getMonth(),
                'date': date.getDate(),
                'year': date.getFullYear(),
            };
            return currDateObj;
        };
        return {
            getCurrentMonthDetails: () => {
                const date = new Date();
                return createDateObject(date);
            },
            getPrevMonthDetails: () => {
                const date = new Date(currDateObj.month === 0 ? currDateObj.year - 1 : currDateObj.year, currDateObj.month === 0 ? 11 : currDateObj.month - 1, 15);
                return createDateObject(date);
            },
            getNextMonthDetails: () => {
                const date = new Date(currDateObj.month === 11 ? currDateObj.year + 1 : currDateObj.year, currDateObj.month === 11 ? 0 : currDateObj.month + 1, 15);
                return createDateObject(date);
            },
            getYearIncreaseMonthDetails: () => {
                const date = new Date(currDateObj.year + 1, currDateObj.month, 15);
                return createDateObject(date);
            },
            getYearDecreaseMonthDetails: () => {
                const date = new Date(currDateObj.year - 1, currDateObj.month, 15);
                return createDateObject(date);
            },
            setDateObject: (date) => {
                const dateArray = date.split('/');
                return createDateObject(new Date(dateArray[2], Number(dateArray[0]) - 1, dateArray[1]));
            },
            getDateObject: () => {
                return currDateObj;
            },
        };
    };

    // UI Controller
    UIController = () => {
        const DOMstrings = {
            showDateContainer: `${PREFIX}-datePicker-panel-show`,
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

        const getDaysInMonth = (month, year) => {
            return new Date(year, month, 0).getDate();
        };

        const initWeekDaysPanel = () => {
            weekDays.forEach((weekDay) => {
                this.datePickerElm.querySelector(DOMstrings.weekDaysPanel).insertAdjacentHTML('beforeend', `<span>${weekDay}</span>`);
            });
        };

        const createDayHTML = (type, i, curMonthObj) => {
            let month, year;
            const day = ('0' + String(i)).slice(-2);
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

        const initDatePanel = (curMonthObj) => {
            const numOfDaysInMonth = getDaysInMonth(curMonthObj.month + 1, curMonthObj.year);
            const element = DOMstrings.datePanel;
            let numOfDaysFromPrevMonth = curMonthObj.day - curMonthObj.date % 7;
            numOfDaysFromPrevMonth = numOfDaysFromPrevMonth < 0 ? 7 + numOfDaysFromPrevMonth : numOfDaysFromPrevMonth;
            const numOfDaysInPrevMonth = getDaysInMonth(curMonthObj.month === 0 ? 12 : curMonthObj.month, curMonthObj.month === 0 ? curMonthObj.year - 1 : curMonthObj.year);

            //days from previous month
            for (let i = numOfDaysInPrevMonth - numOfDaysFromPrevMonth; i <= numOfDaysInPrevMonth && numOfDaysFromPrevMonth !== 6; i++) {
                this.datePickerElm.querySelector(element).insertAdjacentHTML('beforeend', createDayHTML('previous', i, curMonthObj));
            }
            // days from current month
            for (let i = 1; i <= numOfDaysInMonth; i++) {
                this.datePickerElm.querySelector(element).insertAdjacentHTML('beforeend', createDayHTML('current', i, curMonthObj));
            }
            // days from next month  
            const numOfDaysFromNextMonth = numOfDaysFromPrevMonth === 6 ? 42 - numOfDaysInMonth + 1 : 42 - numOfDaysInMonth - numOfDaysFromPrevMonth;
            for (let i = 1; i < numOfDaysFromNextMonth; i++) {
                this.datePickerElm.querySelector(element).insertAdjacentHTML('beforeend', createDayHTML('next', i, curMonthObj));
            }
            // hightlight today's Date
            let todayDate = new Date();
            todayDate = `${('0' + (todayDate.getMonth() + 1)).slice(-2)}/${('0' + todayDate.getDate()).slice(-2)}/${todayDate.getFullYear()}`;
            const selector = `[date='${todayDate}']`;
            this.datePickerElm.querySelector(selector) ? this.datePickerElm.querySelector(selector).classList.add(DOMstrings.todayHighlight) : null;
        };

        const initMonthYearPanel = (curMonthObj) => {
            this.datePickerElm.querySelector(DOMstrings.monthInput).innerHTML = months[curMonthObj.month];
            this.datePickerElm.querySelector(DOMstrings.yearInput).value = String(curMonthObj.year);
        };

        const hightlightSelectedDate = (id) => {
            const elm = this.datePickerElm.querySelector(`.${DOMstrings.datePicked}`);
            elm ? elm.classList.remove(DOMstrings.datePicked) : null;
            const selector = `[date='${id}']`;
            this.datePickerElm.querySelector(selector) ? this.datePickerElm.querySelector(selector).classList.add(DOMstrings.datePicked) : null;
        };

        const showErrorInvalidDate = () => {
            this.datePickerElm.querySelector(DOMstrings.errorDiv).classList.add(DOMstrings.showErrorDiv);
            this.datePickerElm.querySelector(DOMstrings.inputDate).classList.add(DOMstrings.addErrorBorder);

        };
        const hideErrorInvalidDate = () => {
            this.datePickerElm.querySelector(DOMstrings.inputDate).classList.remove(DOMstrings.addErrorBorder);
            this.datePickerElm.querySelector(DOMstrings.errorDiv).classList.remove(DOMstrings.showErrorDiv);

        };

        const hideDateContainer = () => {
            this.datePickerElm.querySelector(DOMstrings.dateContainer).classList.remove(DOMstrings.showDateContainer);
        };

        const toggleDateContainer = () => {
            this.datePickerElm.querySelector(DOMstrings.dateContainer).classList.toggle(DOMstrings.showDateContainer);
        };

        const removeExistingDates = () => {
            this.datePickerElm.querySelector(DOMstrings.datePanel).innerHTML = "";
        };

        const selectDate = (event) => {
            if(event.target.getAttribute('date')){
                hightlightSelectedDate(event.target.getAttribute('date'));
                hideErrorInvalidDate();
                this.datePickerElm.querySelector(DOMstrings.inputDate).value = event.target.getAttribute('date');
                hideDateContainer();
            }
        };

        return {
            // to initialize datepicker for first time
            initDatePicker: (curMonthObj) => {
                initWeekDaysPanel();
                initDatePanel(curMonthObj);
                initMonthYearPanel(curMonthObj);
            },
            // to initialize month/year panel
            initMonthYearPanel: (curMonthObj) => {
                initMonthYearPanel(curMonthObj);
            },
            // to initialize date panel
            initDatePanel: (curMonthObj) => {
                initDatePanel(curMonthObj);
                hightlightSelectedDate(this.datePickerElm.querySelector(DOMstrings.inputDate).value);
            },
            // returns DOMStrings
            getDOMstrings: () => {
                return DOMstrings;
            },
            // remove existing dates from datePanel
            removeExistingDates: () => {
                removeExistingDates();
            },
            // show/hide datepicker
            toggleDateContainer: () => {
                toggleDateContainer();
                trackDocumentClick(this.datePickerElm.querySelector(DOMstrings.inputDate), () => {
                    hideDateContainer();
                });
            },
            // hide datepicker
            hideDateContainer: () => {
                hideDateContainer();
            },
            // action taken once date is selected
            selectDate: (event) => {
                selectDate(event);
            },
            hightlightSelectedDate: (id) => {
                hightlightSelectedDate(id);
            },
            showErrorInvalidDate: () => {
                showErrorInvalidDate();
            },
            hideErrorInvalidDate: () => {
                hideErrorInvalidDate();
            }
        };
    };

    // Main controller
    controller = (dateCtrl, UICtrl) => {
        const DOMstrings = UICtrl.getDOMstrings();

        const setupEventListeners = () => {
            this.datePickerElm.querySelector(DOMstrings.prevMonth).addEventListener('click', prevMonth);
            this.datePickerElm.querySelector(DOMstrings.nextMonth).addEventListener('click', nextMonth);
            this.datePickerElm.querySelector(DOMstrings.yearDecrease).addEventListener('click', yearDecrease);
            this.datePickerElm.querySelector(DOMstrings.yearIncrease).addEventListener('click', yearIncrease);
            this.datePickerElm.querySelector(DOMstrings.inputDate).addEventListener('click', UICtrl.toggleDateContainer);
            this.datePickerElm.querySelector(DOMstrings.inputDate).addEventListener('change', dateChangeHandler);
            this.datePickerElm.querySelector(DOMstrings.inputCalSVG).addEventListener('click', UICtrl.toggleDateContainer);
            this.datePickerElm.querySelector(DOMstrings.yearInput).addEventListener('change', yearChangeHandler);
            this.datePickerElm.querySelector(DOMstrings.dateContainer).addEventListener('click', datePanelClickHandler);
            bindDateEvent();
        };

        const datePanelClickHandler = () => {
            event.stopPropagation();
            event.preventDefault();
        };

        const bindDateEvent = () => {
            const datePanel = this.datePickerElm.querySelector(DOMstrings.datePanel);
            datePanel.addEventListener('click', UICtrl.selectDate);
        };

        const yearChangeHandler = (event) => {
            const regex = /^[0-9]{4}$/g;
            const validYear = regex.test(event.target.value);
            if (validYear) {
                // set current Date;
                let currDateObj = dateCtrl.getDateObject();
                currDateObj = dateCtrl.setDateObject(`${currDateObj.month + 1}/15/${event.target.value}`);
                UICtrl.removeExistingDates();
                UICtrl.initDatePanel(currDateObj);
                UICtrl.initMonthYearPanel(currDateObj);
                UICtrl.hideErrorInvalidDate();
            } else {
                UICtrl.showErrorInvalidDate();
            }
            bindDateEvent();
        };

        const isValidDate = (s) => {
            if (s === '') {
                return true;
            }
            const bits = s.split('/');
            const d = new Date(bits[2], bits[0] - 1, bits[1]);
            return d && (d.getMonth() + 1) == bits[0];
        }

        const dateChangeHandler = (event) => {
            UICtrl.hideDateContainer();
            if (isValidDate(event.target.value)) {
                const currDateObj = dateCtrl.setDateObject(event.target.value);
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

        const prevMonth = () => {
            event.stopPropagation();
            event.preventDefault();
            UICtrl.removeExistingDates();
            const prevMonthObj = dateCtrl.getPrevMonthDetails();
            UICtrl.initMonthYearPanel(prevMonthObj);
            UICtrl.initDatePanel(prevMonthObj);
            setupEventListeners();
        };

        const nextMonth = () => {
            event.stopPropagation();
            event.preventDefault();
            UICtrl.removeExistingDates();
            const nextMonObj = dateCtrl.getNextMonthDetails();
            UICtrl.initMonthYearPanel(nextMonObj);
            UICtrl.initDatePanel(nextMonObj);
            setupEventListeners();
        };

        const yearIncrease = () => {
            event.stopPropagation();
            event.preventDefault();
            UICtrl.removeExistingDates();
            const incYearMonObj = dateCtrl.getYearIncreaseMonthDetails();
            UICtrl.initMonthYearPanel(incYearMonObj);
            UICtrl.initDatePanel(incYearMonObj);
            setupEventListeners();
        };

        const yearDecrease = () => {
            event.stopPropagation();
            event.preventDefault();
            UICtrl.removeExistingDates();
            const decYearMonObj = dateCtrl.getYearDecreaseMonthDetails();
            UICtrl.initMonthYearPanel(decYearMonObj);
            UICtrl.initDatePanel(decYearMonObj);
            setupEventListeners();
        };

        return {
            init: () => {
                UICtrl.initDatePicker(dateCtrl.getCurrentMonthDetails());
                setupEventListeners();
            }
        };
    };
    // controller.init();

    attachEvents = () => {
        const UICtrl = this.UIController();
        this.controller(this.datePickerController(), UICtrl).init();
        UICtrl.toggleDateContainer();
    };

    static handleDataAPI = () => {
        handleDataBinding("datepicker", function (element) {
            return new DatePicker(element);
        })
    };
};
export default DatePicker;