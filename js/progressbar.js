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
      circleText: `.${PREFIX}-progressbar-circle-text`,
      indetermCircle: `.${PREFIX}-circle-pb-svg`
    };
    this.progressStyle = {
      height: '100%',
      transition: 'width 1s ease-in-out'
    };

    if (this.state.linear && this.state.determinate) {
      this.linearDeterminate();
    } else if (!this.state.linear && this.state.determinate) {
      this.circleDeterminate();
    } else if (this.state.linear && !this.state.determinate) {
      this.linearIndeterminate();
    } else if (!this.state.linear && !this.state.determinate) {
      this.circleIndeterminate();
    }
  }

  linearDeterminate() {
    let value = this.element.getAttribute('value');
    let computedValue = value > 1 ? 1 : value;
    let finalVal = computedValue * 100 + '%';
    let linearStyleElement = this.element.querySelector(
      this.selectors.linearProgressbar
    );
    linearStyleElement.style.width = finalVal;
    linearStyleElement.style.height = this.progressStyle.height;
    linearStyleElement.style.transition = this.progressStyle.transition;
  }

  circleDeterminate() {
    let circleValue = this.element.getAttribute('value');
    let size = this.element.querySelector(this.selectors.progressCircle)
      .clientHeight;
    let center = size / 2;
    let radius = size / 2 - 2.5;
    let circumference = 2 * Math.PI * radius;
    circleValue = circleValue > 1 ? 1 : circleValue;
    let prg = circleValue * 100;
    let progressOffset = ((100 - prg) / 100) * circumference; //strokeDashOffset

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

    let circleTextElem = this.element.querySelector(this.selectors.circleText);

    if (size == 19) {
      setAttribute(
        this.element.querySelector(this.selectors.innerCircle),
        'stroke-width',
        2
      );
      setAttribute(
        this.element.querySelector(this.selectors.outerCircle),
        'stroke-width',
        2
      );
      circleTextElem.style.display = 'none';
    } else {
      setAttribute(
        this.element.querySelector(this.selectors.innerCircle),
        'stroke-width',
        4
      );
      setAttribute(
        this.element.querySelector(this.selectors.outerCircle),
        'stroke-width',
        4
      );
      circleTextElem.style.display = 'block';
      setAttribute(
        this.element.querySelector(this.selectors.circleText),
        'x',
        center
      );
      setAttribute(
        this.element.querySelector(this.selectors.circleText),
        'y',
        center
      );
      circleTextElem.innerHTML = prg + '%';
    }
  }

  linearIndeterminate() {}

  circleIndeterminate() {
    // this.element.querySelector(this.selectors.indetermCircle)
    let circleValue = this.element.getAttribute('width');
    // setAttribute(
    //   this.element.querySelector(this.selectors.indetermCircle),
    //   'width',
    //   circleValue
    // );
    // setAttribute(
    //   this.element.querySelector(this.selectors.indetermCircle),
    //   'height',
    //   circleValue
    // );
  }
}

export default ProgressBar;
