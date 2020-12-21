import { PREFIX } from './utils/config';
import { setAttribute } from './utils/dom';

class ProgressBar {
  constructor(element, options) {
    this.element = element;
    this.state = {
      determinate: options.determinate || false,
      linear: options.linear,
      ...options
    };
    this.selectors = {
      linearProgressbar: `.${PREFIX}-progressbar-linear-style`,
      innerCircle: `.${PREFIX}-progressbar-circle-inner`,
      outerCircle: `.${PREFIX}-progressbar-circle-outer`,
      progressCircle: `.${PREFIX}-progressbar-circle`,
      customContent: `.${PREFIX}-progressbar-circle-customContent`,
      indetermCircle: `.${PREFIX}-circle-pb-svg`,
      labelTop: `.${PREFIX}-pb-topLeft`,
      labelBottom: `.${PREFIX}-pb-bottomRight`
    };
    this.progressStyle = {
      height: '100%',
      transition: 'width 1s ease-in-out'
    };

    if (this.state.linear && this.state.determinate) {
      this.linearDeterminate();
    } else if (!this.state.linear && this.state.determinate) {
      this.circleDeterminate();
    }
  }

  linearDeterminate() {
    const value = this.element.getAttribute('value');
    const computedValue = value > 1 ? 1 : value;
    const finalVal = computedValue * 100 + '%';
    const linearStyleElement = this.element.querySelector(
      this.selectors.linearProgressbar
    );
    linearStyleElement.style.width = finalVal;
    linearStyleElement.style.height = this.progressStyle.height;
    linearStyleElement.style.transition = this.progressStyle.transition;
  }

  circleDeterminate() {
    let circleValue = this.element.getAttribute('value');
    const labelPosition = this.element.getAttribute('label-positon');
    const size = this.element.querySelector(this.selectors.progressCircle)
      .clientHeight;
    const center = size / 2;
    const radius = size / 2 - 2.5;
    const circumference = 2 * Math.PI * radius;
    circleValue = circleValue > 1 ? 1 : circleValue;
    const prg = circleValue * 100;
    const progressOffset = ((100 - prg) / 100) * circumference;

    this.element.querySelector(this.selectors.outerCircle).style =
      'transition: stroke-dashoffset 850ms ease-in-out';

    setAttribute(
      this.element.querySelector(this.selectors.innerCircle),
      'cx',
      center
    );
    setAttribute(
      this.element.querySelector(this.selectors.innerCircle),
      'cy',
      center
    );
    setAttribute(
      this.element.querySelector(this.selectors.innerCircle),
      'r',
      radius
    );

    setAttribute(
      this.element.querySelector(this.selectors.outerCircle),
      'cx',
      center
    );
    setAttribute(
      this.element.querySelector(this.selectors.outerCircle),
      'cy',
      center
    );
    setAttribute(
      this.element.querySelector(this.selectors.outerCircle),
      'r',
      radius
    );
    setAttribute(
      this.element.querySelector(this.selectors.outerCircle),
      'stroke-dasharray',
      circumference
    );
    setAttribute(
      this.element.querySelector(this.selectors.outerCircle),
      'stroke-dashoffset',
      progressOffset
    );

    const customContentElem = this.element.querySelector(
      this.selectors.customContent
    );
    const topLeftElem = this.element.querySelector(this.selectors.labelTop);
    const bottomleftElem = this.element.querySelector(
      this.selectors.labelBottom
    );

    if (size === 16) {
      customContentElem.style.display = 'none';
    } else {
      customContentElem.style.display = 'flex';
    }

    if (labelPosition === 'left' && (size === 48 || size === 96)) {
      bottomleftElem.style.display = 'none';
      this.element.classList.remove(`${PREFIX}-pb-top-bottom`);
    } else if (labelPosition === 'right' && (size === 48 || size === 96)) {
      bottomleftElem.style.display = 'flex';
      topLeftElem.style.display = 'none';
      this.element.classList.remove(`${PREFIX}-pb-top-bottom`);
    } else if (labelPosition === 'bottom' && (size === 48 || size === 96)) {
      topLeftElem.style.display = 'none';
      this.element.classList.add(`${PREFIX}-pb-top-bottom`);
    } else if (labelPosition === 'top' && (size === 48 || size === 96)) {
      topLeftElem.style.display = 'flex';
      bottomleftElem.style.display = 'none';
      this.element.classList.add(`${PREFIX}-pb-top-bottom`);
    } else if (
      (labelPosition === 'left' || labelPosition === 'bottom') &&
      size === 16
    ) {
      bottomleftElem.style.display = 'none';
      this.element.classList.remove(`${PREFIX}-pb-top-bottom`);
    } else if (
      (labelPosition === 'right' || labelPosition === 'top') &&
      size === 16
    ) {
      topLeftElem.style.display = 'none';
      this.element.classList.remove(`${PREFIX}-pb-top-bottom`);
    }
  }
}

export default ProgressBar;
