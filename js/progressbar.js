import { PREFIX } from './utils/config';

class ProgressBar {
  constructor(element, options) {
    this.element = element;
    this.state = {
      determinate: options.determinate || false,
      ...options
    };
    this.selectors = {
      linearProgressbar: `.${PREFIX}-progressbar-linear-style`
    };
    this.progressStyle = {
      height: '100%',
      transition: 'width 1s ease-in-out'
    };
    this.progressBarValue = this.element.getAttribute('value');

    this.updateFinalValue(this.progressBarValue);
  }

  updateFinalValue = value => {
    this.state.value = value > 1 ? 1 : value;
    const finalVal = this.state.value * 100 + '%';
    var linearStyleElement = this.element.querySelector(
      this.selectors.linearProgressbar
    );
    linearStyleElement.style.width = finalVal;
    linearStyleElement.style.height = this.progressStyle.height;
    linearStyleElement.style.transition = this.progressStyle.transition;
  };
}

export default ProgressBar;
