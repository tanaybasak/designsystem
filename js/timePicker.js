import { PREFIX } from './utils/config';

class TimePicker {
  constructor(element, options) {
    this.element = element;
    this.input = element.querySelector('input');
    this.type = options && options.type ? options.type : 'hh';
    this.errorContainer = element.querySelector(`.${PREFIX}-error-msg`);
  }

  showErrorMessage = status => {
    this.input.dataset.invalid = status;
    if (this.errorContainer) {
      this.errorContainer.style.display = `${status ? 'block' : 'none'}`;
      this.errorContainer.innerText = 'Please enter a valid time';
    }
  };

  onInputChange = event => {
    this.input.value = event.target.value.replace(/[^0-9:]*/g, '');
    if (this.input.value) {
      if (this.type === 'HH') {
        if (
          this.input.value.match(/^([01]?[0-9]|2?[0-3])$/g) ||
          this.input.value.match(/^([01]?[0-9]|2?[0-3]):$/g) ||
          this.input.value.match(/^([01]?[0-9]|2?[0-3]):[0-5]$/g) ||
          this.input.value.match(/^([01]?[0-9]|2?[0-3]):[0-5][0-9]$/g)
        ) {
          this.showErrorMessage(false);
        } else {
          this.showErrorMessage(true);
        }
      } else {
        if (this.input.value.startsWith('00')) {
          this.showErrorMessage(true);
        } else if (
          this.input.value.match(/^(0?[1-9]|1?[0-2])$/g) ||
          this.input.value.match(/^(0?[1-9]|1?[0-2]):$/g) ||
          this.input.value.match(/^(0?[1-9]|1?[0-2]):[0-5]$/g) ||
          this.input.value.match(/^(0?[1-9]|1?[0-2]):[0-5][0-9]$/g)
        ) {
          this.showErrorMessage(false);
        } else {
          this.showErrorMessage(true);
        }
      }
    }
  };

  keyListener = event => {
    if (event.keyCode === 13) {
      event.preventDefault();
      this.onBlur();
    }
  };

  onBlur = () => {
    if (this.type === 'HH') {
      if (this.input.value.match(/^([01]?[0-9]|2?[0-3]):[0-5][0-9]$/g)) {
        const timeArray = this.input.value.split(':');
        this.input.value = ('0' + timeArray[0]).slice(-2) + ':' + timeArray[1];
        this.showErrorMessage(false);
      } else if (this.input.value.match(/^([01]?[0-9]|2?[0-3])$/g)) {
        this.input.value = ('0' + this.input.value).slice(-2) + ':00';
        this.showErrorMessage(false);
      } else if (this.input.value.match(/^([01]?[0-9]|2?[0-3]):$/g)) {
        this.input.value = ('0' + this.input.value).slice(-3) + '00';
        this.showErrorMessage(false);
      } else {
        this.showErrorMessage(true);
      }
    } else {
      if (this.input.value.match(/^(0?[1-9]|1?[0-2]):[0-5][0-9]$/g)) {
        const timeArray = this.input.value.split(':');
        const newTime = ('0' + timeArray[0]).slice(-2) + ':' + timeArray[1];
        this.isTimeValidIn12hFormat(newTime);
      } else if (this.input.value.match(/^(0?[1-9]|1?[0-2])$/g)) {
        const newTime = ('0' + this.input.value).slice(-2) + ':00';
        this.isTimeValidIn12hFormat(newTime);
      } else if (this.input.value.match(/^(0?[1-9]|1?[0-2]):$/g)) {
        const newTime = ('0' + this.input.value).slice(-3) + '00';
        this.isTimeValidIn12hFormat(newTime);
      } else {
        this.showErrorMessage(true);
      }
    }
  };

  isTimeValidIn12hFormat = newTime => {
    if (newTime.startsWith('00')) {
      this.showErrorMessage(true);
    } else {
      this.input.value = newTime;
      this.showErrorMessage(false);
    }
  };

  attachEvents = () => {
    this.input.addEventListener('input', this.onInputChange.bind(this));
    this.input.addEventListener('blur', this.onBlur.bind(this));
    this.input.addEventListener('keypress', this.keyListener.bind(this));
  };
}
export default TimePicker;
