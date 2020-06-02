import { PREFIX } from './utils/config';
import debounceFunction from './utils/debounce';
import { NOOP } from './utils/functions';
import { findMinMax, isInAP } from './utils/number';
class Slider {
  constructor(element, options) {
    this.element = element;
    this.sliderInput = element.querySelector(`.${PREFIX}-slider-input`);
    this.textInput = element.querySelector(`.${PREFIX}-slider-text-input`);
    this.sliderTooltip = element.querySelector(`.${PREFIX}-range-value`);
    this.errorElement = element.querySelector(`.${PREFIX}-error-msg`);
    this.min = Number(this.sliderInput.min || 0);
    this.max = Number(this.sliderInput.max || 100);
    this.step = Number(this.sliderInput.step || 1);

    this.state = {
      onError: NOOP,
      ...options
    };
    this._setRange();
    this._setTooltipPosition();
  }

  attachEvents() {
    this.sliderInput.addEventListener(
      'input',
      this._handleRangeChange.bind(this)
    );
    this.sliderInput.addEventListener(
      'click',
      this._handleClickEvent.bind(this)
    );
    if (this.textInput) {
      this.textInput.addEventListener(
        'input',
        this._handleTextChange.bind(this)
      );
    }
  }

  _handleClickEvent() {
    this.sliderInput.focus();
  }

  _handleRangeChange(event) {
    event.stopPropagation(event);
    this._setRange();
    this._setTooltipPosition();
    this.returnError(null);
  }

  returnError(key, message) {
    if (typeof this.state.onError === 'function') {
      this.state.onError(key, message);
    }
    if (key) {
      this.textInput.setAttribute('data-invalid', true);
      if (this.errorElement) {
        this.errorElement.innerText = message.message;
      }
    } else {
      this.textInput.setAttribute('data-invalid', false);
      if (this.errorElement) {
        this.errorElement.innerText = '';
      }
    }
  }

  updateSliderValue() {
    if (
      isNaN(this.textInput.value) ||
      this.textInput.value === '' ||
      this.textInput.value === null
    ) {
      this.returnError('invalid', {
        message: 'Please enter a valid value'
      });
    } else {
      const value = Number(this.textInput.value);
      if (value < this.min) {
        this.returnError('min', {
          message: 'Value must be greater than or equal to ' + this.min
        });
      } else if (value > this.max) {
        this.returnError('max', {
          message: 'Value must be less than or equal to ' + this.max
        });
      } else {
        if (isInAP(this.min, this.step, value)) {
          this.sliderInput.value = value;
          this._setRange();
          this._setTooltipPosition();
          this.returnError(null);
        } else {
          const nearestValue = findMinMax(this.min, this.step, value);
          this.returnError('invalid', {
            message:
              'Please enter a valid value. The two nearest valid values are ' + nearestValue.join(' and '),
            nearestValue: nearestValue
          });
        }
      }
    }
  }

  _handleTextChange() {
    debounceFunction(this.updateSliderValue.bind(this), 500);
  }

  _setRange() {
    const percentage =
      (100 * (this.sliderInput.value - this.min)) / (this.max - this.min);
    this.element.style.setProperty('--progressPercent', `${percentage}%`);
    if (this.textInput) {
      this.textInput.value = this.sliderInput.value;
    }
  }

  _setTooltipPosition() {
    if (this.sliderTooltip) {
      const newValue = Number(
        ((this.sliderInput.value - this.min) * 100) / (this.max - this.min)
      );
      const newPosition = 10 - newValue * 0.2;
      this.sliderTooltip.style.left = `calc(${newValue}% + (${newPosition}px))`;

      this.sliderTooltip.firstElementChild.innerText = this.sliderInput.value;
    }
  }
}
export default Slider;
