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
            const datePanel = this.datePickerElm.querySelector(element);

            //days from previous month
            for (let i = numOfDaysInPrevMonth - numOfDaysFromPrevMonth; i <= numOfDaysInPrevMonth && numOfDaysFromPrevMonth !== 6; i++) {
                datePanel.insertAdjacentHTML('beforeend', createDayHTML('previous', i, curMonthObj));
            }
            // days from current month
            for (let i = 1; i <= numOfDaysInMonth; i++) {
                datePanel.insertAdjacentHTML('beforeend', createDayHTML('current', i, curMonthObj));
            }
            // days from next month  
            const numOfDaysFromNextMonth = numOfDaysFromPrevMonth === 6 ? 42 - numOfDaysInMonth + 1 : 42 - numOfDaysInMonth - numOfDaysFromPrevMonth;
            for (let i = 1; i < numOfDaysFromNextMonth; i++) {
                datePanel.insertAdjacentHTML('beforeend', createDayHTML('next', i, curMonthObj));
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

        const showDateContainer = () => {
            event.stopPropagation();
            event.preventDefault();
            this.datePickerElm.querySelector(DOMstrings.dateContainer).classList.add(DOMstrings.showDateContainer);
            trackDocumentClick(this.datePickerElm.querySelector(DOMstrings.inputDate), () => {
                hideDateContainer();
            });
        };

        const removeExistingDates = () => {
            this.datePickerElm.querySelector(DOMstrings.datePanel).innerHTML = "";
        };

        const selectDate = (event) => {
            if (event.target.getAttribute('date')) {
                hightlightSelectedDate(event.target.getAttribute('date'));
                hideErrorInvalidDate();
                setInputDate(event.target.getAttribute('date'));
                hideDateContainer();
            }
        };

        const setInputDate = (date) => {
            this.datePickerElm.querySelector(DOMstrings.inputDate).value = date;
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
            showDateContainer: () => {
                showDateContainer();
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
            },
            setInputDate: (date) => {
                setInputDate(date);
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
            this.datePickerElm.querySelector(DOMstrings.inputDate).addEventListener('click', toggleDateContainer);
            this.datePickerElm.querySelector(DOMstrings.inputDate).addEventListener('change', dateChangeHandler);
            this.datePickerElm.querySelector(DOMstrings.inputCalSVG).addEventListener('click', toggleDateContainer);
            this.datePickerElm.querySelector(DOMstrings.yearInput).addEventListener('change', yearChangeHandler);
            this.datePickerElm.querySelector(DOMstrings.dateContainer).addEventListener('click', datePanelClickHandler);
            bindDateEvent();
        };

        const checkErrorBox = (value) => {
            if (isValidDate(value) || value === '') {
                UICtrl.hideErrorInvalidDate();
                value === '' ? UICtrl.initMonthYearPanel(dateCtrl.getDateObject()) : null;
            }
        }

        const toggleDateContainer = (event) => {
            checkErrorBox(event.target.value);
            if (this.datePickerElm.querySelector(DOMstrings.dateContainer).classList.contains(DOMstrings.showDateContainer)) {
                UICtrl.hideDateContainer();
            } else {
                const selectedDate = this.datePickerElm.querySelector(DOMstrings.inputDate).value;
                if (isValidDate(selectedDate) && selectedDate !== '') {
                    eventHandler(dateCtrl.setDateObject(selectedDate));
                }
                UICtrl.showDateContainer();
            }
        };

        const datePanelClickHandler = (event) => {
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
                eventHandler(currDateObj);
                UICtrl.hideErrorInvalidDate();
            } else {
                UICtrl.showErrorInvalidDate();
            }
            bindDateEvent();
        };

        const isValidDate = (s) => {
            if(s){
                const regex = /^[0-9]{2}[\/][0-9]{2}[\/][0-9]{4}$/g;
                s = s.split('/');
                if (s.length === 3 && (s[0].length === 1 || s[1].length === 1)) {
                    s[0].length === 1 ? s[0] = s[0].padStart(2, '0') : null;
                    s[1].length === 1 ? s[1] = s[1].padStart(2, '0') : null;
                }
                const d = new Date(s[2], s[0] - 1, s[1]);
                if (d && (d.getMonth() + 1) == s[0] && regex.test(s.join('/')) && s[2] > 999) {
                    UICtrl.setInputDate(s.join('/'));
                    return true;
                } else {
                    return false;
                }   
            }else{
                return false;
            }
         
        }

        const dateChangeHandler = (event) => {
            checkErrorBox(event.target.value);
            UICtrl.hideDateContainer();
            if (isValidDate(event.target.value)) {
                let date = event.target.value;
                date = date.split('/');
                eventHandler(dateCtrl.setDateObject(event.target.value));
                UICtrl.hightlightSelectedDate(event.target.value);
                UICtrl.hideErrorInvalidDate();
                bindDateEvent();
            } else {
                if(event.target.value !== '')
                UICtrl.showErrorInvalidDate();
            }
        };

        const eventHandler = (dateObj) => {
            event.stopPropagation();
            event.preventDefault();
            UICtrl.removeExistingDates();
            UICtrl.initMonthYearPanel(dateObj);
            UICtrl.initDatePanel(dateObj);
        };

        const prevMonth = () => {
            eventHandler(dateCtrl.getPrevMonthDetails());
        };

        const nextMonth = () => {
            eventHandler(dateCtrl.getNextMonthDetails());
        };

        const yearIncrease = () => {
            eventHandler(dateCtrl.getYearIncreaseMonthDetails());
        };

        const yearDecrease = () => {
            eventHandler(dateCtrl.getYearDecreaseMonthDetails());
        };

        return {
            init: () => {
                UICtrl.initDatePicker(dateCtrl.getCurrentMonthDetails());
                setupEventListeners();
            }
        };
    };

    attachEvents = () => {
        const UICtrl = this.UIController();
        this.controller(this.datePickerController(), UICtrl).init();
        UICtrl.showDateContainer();
    };

    static handleDataAPI = () => {
        handleDataBinding("datepicker", function (element) {
            return new DatePicker(element);
        })
    };
};
export default DatePicker;