import { PREFIX, WEEKDAYS, MONTHS } from './utils/config';
import { NOOP } from './utils/functions';
import Overlay from './overlay';

class DatePicker {
  constructor(element, options) {
    this.datePickerElm = element;
    this.state = {
      onChange: NOOP,
      isOpen: false,
      attachElementToBody: false,
      scrollListner: false,
      direction: 'bottom-left',
      ...options
    };
    this.overlay = null;
  }

  // DatePicker Controller
  datePickerController = () => {
    let currDateObj = {};
    const createDateObject = date => {
      currDateObj = {
        day: date.getDay(),
        month: date.getMonth(),
        date: date.getDate(),
        year: date.getFullYear()
      };
      return currDateObj;
    };
    return {
      getCurrentMonthDetails: () => {
        const date = new Date();
        return createDateObject(date);
      },
      getPrevMonthDetails: () => {
        const date = new Date(
          currDateObj.month === 0 ? currDateObj.year - 1 : currDateObj.year,
          currDateObj.month === 0 ? 11 : currDateObj.month - 1,
          15
        );
        return createDateObject(date);
      },
      getNextMonthDetails: () => {
        const date = new Date(
          currDateObj.month === 11 ? currDateObj.year + 1 : currDateObj.year,
          currDateObj.month === 11 ? 0 : currDateObj.month + 1,
          15
        );
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
      setDateObject: date => {
        const dateArray = date.split('/');
        return createDateObject(
          new Date(dateArray[2], Number(dateArray[0]) - 1, dateArray[1])
        );
      },
      getDateObject: () => {
        return currDateObj;
      }
    };
  };

  // UI Controller
  UIController = () => {
    const DOMstrings = {
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
      datePanelContainer: `.${PREFIX}-datePicker-panel`,
      dateContainer: `.${PREFIX}-overlay-container`,
      errorDiv: `.${PREFIX}-datePicker-error`,
      fade: `${PREFIX}-datePicker-date-fade`
    };

    const getElement = elementSelector => {
      if (this.datePickerElm.querySelector(elementSelector)) {
        return this.datePickerElm.querySelector(elementSelector);
      } else {
        return this.overlay.targetElement.querySelector(elementSelector);
      }
    };
    const getDaysInMonth = (month, year) => {
      return new Date(year, month, 0).getDate();
    };

    const initWeekDaysPanel = () => {
      WEEKDAYS.forEach(weekDay => {
        getElement(DOMstrings.weekDaysPanel).insertAdjacentHTML(
          'beforeend',
          `<span>${weekDay}</span>`
        );
      });
    };

    const createDayHTML = (type, i, curMonthObj) => {
      let month, year;
      const day = ('0' + String(i)).slice(-2);
      switch (type) {
        case 'previous':
          month = (
            '0' + (curMonthObj.month === 0 ? 12 : curMonthObj.month)
          ).slice(-2);
          year =
            curMonthObj.month === 0 ? curMonthObj.year - 1 : curMonthObj.year;
          break;
        case 'current':
          month = ('0' + (Number(curMonthObj.month) + 1)).slice(-2);
          year = curMonthObj.year;
          break;
        case 'next':
          month = (
            '0' +
            (Number(curMonthObj.month === 11 ? -1 : curMonthObj.month) + 2)
          ).slice(-2);
          year =
            curMonthObj.month === 11 ? curMonthObj.year + 1 : curMonthObj.year;
      }
      return `<span class='${DOMstrings.dateUnSelected} ${
        type !== 'current' ? DOMstrings.fade : ''
      }' date='${month}/${day}/${year}'>${day} </span>`;
    };

    const initDatePanel = curMonthObj => {
      const numOfDaysInMonth = getDaysInMonth(
        curMonthObj.month + 1,
        curMonthObj.year
      );
      const element = DOMstrings.datePanel;
      let numOfDaysFromPrevMonth = curMonthObj.day - (curMonthObj.date % 7);
      numOfDaysFromPrevMonth =
        numOfDaysFromPrevMonth < 0
          ? 7 + numOfDaysFromPrevMonth
          : numOfDaysFromPrevMonth;
      const numOfDaysInPrevMonth = getDaysInMonth(
        curMonthObj.month === 0 ? 12 : curMonthObj.month,
        curMonthObj.month === 0 ? curMonthObj.year - 1 : curMonthObj.year
      );
      const datePanel = getElement(element);

      // days from previous month
      for (
        let i = numOfDaysInPrevMonth - numOfDaysFromPrevMonth;
        // eslint-disable-next-line no-unmodified-loop-condition
        i <= numOfDaysInPrevMonth && numOfDaysFromPrevMonth !== 6;
        i++
      ) {
        datePanel.insertAdjacentHTML(
          'beforeend',
          createDayHTML('previous', i, curMonthObj)
        );
      }
      // days from current month
      for (let i = 1; i <= numOfDaysInMonth; i++) {
        datePanel.insertAdjacentHTML(
          'beforeend',
          createDayHTML('current', i, curMonthObj)
        );
      }
      // days from next month
      const numOfDaysFromNextMonth =
        numOfDaysFromPrevMonth === 6
          ? 42 - numOfDaysInMonth + 1
          : 42 - numOfDaysInMonth - numOfDaysFromPrevMonth;
      for (let i = 1; i < numOfDaysFromNextMonth; i++) {
        datePanel.insertAdjacentHTML(
          'beforeend',
          createDayHTML('next', i, curMonthObj)
        );
      }
      // hightlight today's Date
      let todayDate = new Date();
      todayDate = `${('0' + (todayDate.getMonth() + 1)).slice(-2)}/${(
        '0' + todayDate.getDate()
      ).slice(-2)}/${todayDate.getFullYear()}`;
      const selector = `[date='${todayDate}']`;
      if (getElement(selector)) {
        getElement(selector).classList.add(DOMstrings.todayHighlight);
      }
    };

    const initMonthYearPanel = curMonthObj => {
      getElement(DOMstrings.monthInput).textContent = MONTHS[curMonthObj.month];
      getElement(DOMstrings.yearInput).value = String(curMonthObj.year);
    };

    const hightlightSelectedDate = id => {
      const elm = getElement(`.${DOMstrings.datePicked}`);
      if (elm) {
        elm.classList.remove(DOMstrings.datePicked);
      }
      const selector = `[date='${id}']`;
      if (getElement(selector)) {
        getElement(selector).classList.add(DOMstrings.datePicked);
      }
    };

    const showErrorInvalidDate = () => {
      getElement(DOMstrings.errorDiv).classList.add(DOMstrings.showErrorDiv);
      getElement(DOMstrings.inputDate).classList.add(DOMstrings.addErrorBorder);
    };
    const hideErrorInvalidDate = () => {
      getElement(DOMstrings.inputDate).classList.remove(
        DOMstrings.addErrorBorder
      );
      getElement(DOMstrings.errorDiv).classList.remove(DOMstrings.showErrorDiv);
    };

    const removeExistingDates = () => {
      getElement(DOMstrings.datePanel).innerHTML = '';
    };

    const selectDate = event => {
      if (event.target.getAttribute('date')) {
        hightlightSelectedDate(event.target.getAttribute('date'));
        hideErrorInvalidDate();
        setInputDate(event.target.getAttribute('date'));
        this.overlay.hideOverlay();
        if (typeof this.state.onChange === 'function') {
          this.state.onChange(event, event.target.getAttribute('date'));
        }
      }
    };

    const setInputDate = date => {
      getElement(DOMstrings.inputDate).value = date;
    };

    return {
      // to initialize datepicker for first time
      initDatePicker: curMonthObj => {
        initWeekDaysPanel();
        initDatePanel(curMonthObj);
        initMonthYearPanel(curMonthObj);
      },
      // to initialize month/year panel
      initMonthYearPanel: curMonthObj => {
        initMonthYearPanel(curMonthObj);
      },
      // to initialize date panel
      initDatePanel: curMonthObj => {
        initDatePanel(curMonthObj);
        hightlightSelectedDate(getElement(DOMstrings.inputDate).value);
      },
      // returns DOMStrings
      getDOMstrings: () => {
        return DOMstrings;
      },
      // remove existing dates from datePanel
      removeExistingDates: () => {
        removeExistingDates();
      },
      // action taken once date is selected
      selectDate: event => {
        selectDate(event);
      },
      hightlightSelectedDate: id => {
        hightlightSelectedDate(id);
      },
      showErrorInvalidDate: () => {
        showErrorInvalidDate();
      },
      hideErrorInvalidDate: () => {
        hideErrorInvalidDate();
      },
      setInputDate: date => {
        setInputDate(date);
      },
      getElement: elementSelector => {
        return getElement(elementSelector);
      }
    };
  };

  // Main controller
  controller = (dateCtrl, UICtrl) => {
    const DOMstrings = UICtrl.getDOMstrings();

    const setupEventListeners = () => {
      this.datePickerElm
        .querySelector(DOMstrings.prevMonth)
        .addEventListener('click', prevMonth);
      this.datePickerElm
        .querySelector(DOMstrings.nextMonth)
        .addEventListener('click', nextMonth);
      this.datePickerElm
        .querySelector(DOMstrings.yearDecrease)
        .addEventListener('click', yearDecrease);
      this.datePickerElm
        .querySelector(DOMstrings.yearIncrease)
        .addEventListener('click', yearIncrease);

      this.datePickerElm
        .querySelector(DOMstrings.inputDate)
        .addEventListener('change', dateChangeHandler);
      this.datePickerElm
        .querySelector(DOMstrings.inputCalSVG)
        .addEventListener('click', onClickInputCalSVG);
      this.datePickerElm
        .querySelector(DOMstrings.yearInput)
        .addEventListener('change', yearChangeHandler);
      this.datePickerElm
        .querySelector(DOMstrings.datePanelContainer)
        .addEventListener('click', datePanelClickHandler);
      bindDateEvent();

      this.overlay = new Overlay(
        this.datePickerElm.querySelector(DOMstrings.inputDate),
        {
          attachElementToBody: this.state.attachElementToBody,
          scrollListner: this.state.scrollListner,
          direction: this.state.direction,
          preventCloseElements: [
            this.datePickerElm.querySelector(DOMstrings.inputCalSVG)
          ],
          onToggle: status => {
            this.state.isOpen = status;

            if (status) {
              const selectedDate = this.datePickerElm.querySelector(
                DOMstrings.inputDate
              ).value;
              if (isValidDate(selectedDate) && selectedDate !== '') {
                eventHandler(dateCtrl.setDateObject(selectedDate));
              }
            }
          }
        }
      );
      this.overlay.setTargetElement(
        this.datePickerElm.querySelector(DOMstrings.dateContainer)
      );
      this.overlay.attachEvents();
    };

    const onClickInputCalSVG = event => {
      event.stopPropagation();
      event.preventDefault();
      if (!event.currentTarget.previousElementSibling.disabled) {
        if (this.state.isOpen) {
          this.overlay.hideOverlay('toggle');
        } else {
          this.overlay.showOverlay();
        }
      }
    };

    const checkErrorBox = value => {
      if (isValidDate(value) || value === '') {
        UICtrl.hideErrorInvalidDate();
        if (value === '') {
          UICtrl.initMonthYearPanel(dateCtrl.getDateObject());
        }
      }
    };

    const datePanelClickHandler = event => {
      event.stopPropagation();
      event.preventDefault();
    };

    const bindDateEvent = () => {
      let datePanel = this.datePickerElm.querySelector(DOMstrings.datePanel);
      if (!datePanel) {
        datePanel = this.overlay.targetElement.querySelector(
          DOMstrings.datePanel
        );
      }
      datePanel.addEventListener('click', UICtrl.selectDate);
    };

    const yearChangeHandler = event => {
      const regex = /^[0-9]{4}$/g;
      const validYear =
        regex.test(event.target.value) && event.target.value > 999;
      if (validYear) {
        // set current Date;
        let currDateObj = dateCtrl.getDateObject();
        currDateObj = dateCtrl.setDateObject(
          `${currDateObj.month + 1}/15/${event.target.value}`
        );
        eventHandler(currDateObj);
        UICtrl.hideErrorInvalidDate();
      } else {
        UICtrl.showErrorInvalidDate();
      }
      bindDateEvent();
    };

    const isValidDate = s => {
      if (s) {
        // eslint-disable-next-line no-useless-escape
        const regex = /^[0-9]{2}[\/][0-9]{2}[\/][0-9]{4}$/g;
        s = s.split('/');
        if (s.length === 3 && (s[0].length === 1 || s[1].length === 1)) {
          if (s[0].length === 1) {
            s[0] = s[0].padStart(2, '0');
          }
          if (s[1].length === 1) {
            s[1] = s[1].padStart(2, '0');
          }
        }
        const d = new Date(s[2], s[0] - 1, s[1]);
        if (
          d &&
          // eslint-disable-next-line eqeqeq
          d.getMonth() + 1 == s[0] &&
          regex.test(s.join('/')) &&
          s[2] > 999
        ) {
          UICtrl.setInputDate(s.join('/'));
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    };

    const dateChangeHandler = event => {
      event.stopPropagation();
      event.preventDefault();
      checkErrorBox(event.target.value);
      if (isValidDate(event.target.value)) {
        eventHandler(dateCtrl.setDateObject(event.target.value));
        UICtrl.hightlightSelectedDate(event.target.value);
        UICtrl.hideErrorInvalidDate();
        bindDateEvent();
      } else {
        if (event.target.value !== '') UICtrl.showErrorInvalidDate();
      }
    };

    const eventHandler = dateObj => {
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
  };
}
export default DatePicker;
