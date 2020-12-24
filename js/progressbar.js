import { PREFIX } from './utils/config';
import { setAttribute } from './utils/dom';

class ProgressBar {
  constructor(element, options) {
    this.element = element;
    this.state = {
      determinate: options.determinate || true,
      progressValue: options.value || 0.5,
      linear: options.linear || false,
      ...options
    };
    this.selectors = {
      outerCircle: `.pb-circle-outer`,
      progressCircle: `.${PREFIX}-pb-circle-determinate`,
      linearElement: `.${PREFIX}-pb-linear-determinate`,
      customContent: `.${PREFIX}-pb-circle-text`,
      linearProgressLine: `.${PREFIX}-pb-linear-mainline`
    };

    if (
      this.state.linear &&
      this.state.determinate &&
      this.element.querySelector(this.selectors.linearElement)
    ) {
      this.linearDeterminate();
    } else if (
      !this.state.linear &&
      this.state.determinate &&
      this.element.querySelector(this.selectors.progressCircle)
    ) {
      this.circleDeterminate();
    }
  }

  linearDeterminate() {
    const value = this.state.progressValue;
    const computedValue = value > 1 ? 1 : value;
    const finalVal = 100 - computedValue * 100;
    setAttribute(
      this.element.querySelector(this.selectors.linearProgressLine),
      'stroke-dashoffset',
      finalVal
    );
  }

  circleDeterminate() {
    let circleValue = this.state.progressValue;
    const size = this.element.querySelector(this.selectors.progressCircle)
      .clientHeight;
    const radius = this.element
      .querySelector(this.selectors.outerCircle)
      .getAttribute('r');
    const circumference = 2 * Math.PI * radius;
    circleValue = circleValue > 1 ? 1 : circleValue;
    const prg = circleValue * 100;
    const progressOffset = ((100 - prg) / 100) * circumference;
    const customContent = this.element.querySelector(
      this.selectors.customContent
    );

    if (size === 16) {
      customContent.style.display = 'none';
    } else {
      customContent.style.display = 'flex';
    }

    setAttribute(
      this.element.querySelector(this.selectors.outerCircle),
      'stroke-dashoffset',
      progressOffset
    );

    setAttribute(
      this.element.querySelector(this.selectors.outerCircle),
      'stroke-dasharray',
      circumference
    );
  }
}

export default ProgressBar;
