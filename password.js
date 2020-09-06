import { PREFIX } from './utils/config';
import getClosest from './utils/get-closest';
import handleDataBinding from './utils/data-api';

class Password {
  constructor(element, options) {
    this.element = element;
    this.selectors = {
      button: `.${PREFIX}-password-visibility`,
      visibilityoff: `.${PREFIX}-icon-visibility-off`,
      visibilityon: `.${PREFIX}-icon-visibility-on`
    };

    this.state = {
      button: {
        clicked: false
      },
      ...options
    };

    this.toggleState();
  }

  toggleState = () => {
    const inputTag = this.element.parentElement.querySelector('input');
    const svgOff = this.element.querySelector(this.selectors.visibilityoff);
    const svgOn = this.element.querySelector(this.selectors.visibilityon);

    if (this.state.button.clicked && inputTag && svgOff && svgOn) {
      this.toggle(inputTag, svgOff, svgOn);
    }
  };

  toggle = (inputTag, svgOff, svgOn) => {
    if (inputTag.type === 'password') {
      inputTag.type = 'text';
      svgOn.style.display = 'initial';
      svgOff.style.display = 'none';
    } else if (inputTag.type === 'text') {
      inputTag.type = 'password';
      svgOff.style.display = 'initial';
      svgOn.style.display = 'none';
    }
    inputTag.focus();
  };

  handleToggle = e => {
    const button = getClosest(e.target, `.${PREFIX}-password-visibility`);
    const svgOff = button.querySelector(this.selectors.visibilityoff);
    const svgOn = button.querySelector(this.selectors.visibilityon);
    const inputTag = button.parentElement
      ? button.parentElement.querySelector('input')
      : null;

    if (button && svgOff && svgOn && inputTag) {
      this.toggle(inputTag, svgOff, svgOn);
    }
  };

  attachEvents = () => {
    this.element.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      this.handleToggle(e);
    });
  };

  static handleDataAPI = () => {
    handleDataBinding('password', function (element, target) {
      if (element && target) {
        const defaultOption = {
          button: {
            clicked: false
          }
        };
        if (getClosest(target, `.${PREFIX}-password-visibility`)) {
          defaultOption.button = { clicked: true };
        }

        return new Password(element, {
          ...defaultOption
        });
      }
    });
  };
}

export default Password;
