import { PREFIX } from './utils/config';

const colors = {
  fill: '#0066b3',
  background: '#aaa'
};

class Slider {
  constructor(element) {
    this.sliderInput = element.querySelector(`.${PREFIX}-slider-input`);
    this.textInput = element.querySelector(`.${PREFIX}-slider-text-input`);
    this.min = Number(this.sliderInput.min || 0);
    this.max = Number(this.sliderInput.max || 100);
    this.step = Number(this.sliderInput.step || 1);
    this._setRange();
  }

  attachEvents() {
    this.sliderInput.addEventListener(
      'input',
      this._handleRangeChange.bind(this)
    );
    if (this.textInput) {
      this.textInput.addEventListener(
        'blur',
        this._handleTextChange.bind(this)
      );
    }
  }

  _handleRangeChange(event) {
    event.stopPropagation(event);
    this._setRange();
  }

  _handleTextChange(event) {
    event.stopPropagation(event);
    const value = Number(this.textInput.value);
    if (value < this.min) {
      this.textInput.value = this.min;
      this.sliderInput.value = this.min;
    } else if (value > this.max) {
      this.textInput.value = this.max;
      this.sliderInput.value = this.max;
    } else {
      this.sliderInput.value = value;
    }
    this._setRange();
  }

  _setRange() {
    const percentage =
      (100 * (this.sliderInput.value - this.min)) / (this.max - this.min);
    const bg = `linear-gradient(90deg, ${colors.fill} ${percentage}%, ${
      colors.background
    } ${percentage + 0.1}%)`;
    this.sliderInput.style.background = bg;
    if (this.textInput) {
      this.textInput.value = this.sliderInput.value;
    }
  }
}
export default Slider;
