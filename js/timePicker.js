import { PREFIX } from './utils/config';

class TimePicker {
  constructor(element) {
    this.element = element;
    this.input = element.querySelector('input');
    this.errorContainer = element.querySelector(`.${PREFIX}-error-msg`);
  }

  showErrorMessage = status => {
    this.input.setAttribute('data-invalid', status);
    if (this.errorContainer) {
      this.errorContainer.style.display = `${status ? 'block' : 'none'}`;
      this.errorContainer.innerText = 'Please enter a valid time';
    }
  };

  onInputChange = event => {
    this.input.value = event.target.value.replace(/[^0-9:]*/g, '');
    if (this.input.value) {
      if (
        this.input.value.match(/^([01]?[0-9]|2[0-3])$/g) ||
        this.input.value.match(/^([01]?[0-9]|2[0-3]):$/g) ||
        this.input.value.match(/^([01]?[0-9]|2[0-3]):[0-5]$/g) ||
        this.input.value.match(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/g)
      ) {
        this.showErrorMessage(false);
      } else {
        this.showErrorMessage(true);
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
    if (this.input.value.match(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/g)) {
      this.showErrorMessage(false);
    } else if (this.input.value.match(/^([01]?[0-9]|2[0-3])$/g)) {
      this.input.value = this.input.value + ':00';
      this.showErrorMessage(false);
    } else if (this.input.value.match(/^([01]?[0-9]|2[0-3]):$/g)) {
      this.input.value = this.input.value + '00';
      this.showErrorMessage(false);
    } else {
      this.showErrorMessage(true);
    }
  };

  attachEvents = () => {
    this.input.addEventListener('input', this.onInputChange.bind(this));
    this.input.addEventListener('blur', this.onBlur.bind(this));
    this.input.addEventListener('keypress', this.keyListener.bind(this));
  };
}
export default TimePicker;
