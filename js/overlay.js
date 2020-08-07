import { PREFIX } from './utils/config';
import { addListener, removeListeners } from './eventManager';
import { getPositions } from './utils/overlayUtil';
import debounceFunction from './utils/debounce';
import { NOOP } from './utils/functions';
let overlayRef = 0;
const overlayContents = {};
class Overlay {
  constructor(element, options) {
    this.element = element;
    this.overflowId = overlayRef++;
    this.targetElementSelector = element.getAttribute('data-target');
    this.state = {
      direction: 'top-right',
      scrollListner: false,
      onToggle: NOOP,
      attachElementToBody: false,
      closeOnEscape: false,
      ...options
    };
  }

  setTargetElementSelector = ele => {
    this.targetElementSelector = ele;
  };

  show = () => {
    const targetElement = document.querySelector(this.targetElementSelector);

    if (this.state.attachElementToBody) {
      document.body.appendChild(targetElement);
    }

    const elementInfo = targetElement.getBoundingClientRect();
    const positions = getPositions(
      this.state.direction,
      elementInfo.width,
      elementInfo.height,
      this.element,
      this.state.attachElementToBody
    );
    targetElement.style.top = positions.top;
    targetElement.style.left = positions.left;
    targetElement.classList.add('hcl-overlay-container-show');
    addListener(
      'overflowId-' + this.overflowId,
      'click',
      e => {
        this.closeOverlay(e);
      },
      true
    );

    if (this.state.scrollListner) {
      addListener(
        'overflowId-' + this.overflowId,
        'scroll',
        e => {
          this.handleScroll(e);
        },
        true
      );
    }

    this.state.onToggle(true);
  };

  handleScroll(e) {
    debounceFunction(this.updateElementPosition.bind(this), 500);
  }

  visibleY(el) {
    let rect = el.getBoundingClientRect();
    const top = rect.top;
    const height = rect.height;
    let newEl = el.parentNode;
    // Check if bottom of the element is off the page
    if (rect.bottom < 0) {
      return false;
    }
    // Check its within the document viewport
    if (top > document.documentElement.clientHeight) {
      return false;
    }
    do {
      rect = newEl.getBoundingClientRect();
      // eslint-disable-next-line no-mixed-operators
      if (top <= rect.bottom === false) {
        return false;
      }
      // Check if the element is out of view due to a container scrolling
      if (top + height <= rect.top) {
        return false;
      }
      newEl = newEl.parentNode;
    } while (newEl !== document.body);
    return true;
  }

  updateElementPosition() {
    const targetElement = document.querySelector(this.targetElementSelector);
    if (this.visibleY(this.element)) {
      const elementInfo = targetElement.getBoundingClientRect();
      const positions = getPositions(
        this.state.direction,
        elementInfo.width,
        elementInfo.height,
        this.element,
        this.state.attachElementToBody
      );
      targetElement.style.top = positions.top;
      targetElement.style.left = positions.left;
      targetElement.classList.add('hcl-overlay-container-scroll');
      targetElement.classList.remove('hcl-overlay-container-hidden');
    } else {
      targetElement.classList.add('hcl-overlay-container-hidden');
    }
  }

  hide = type => {
    document
      .querySelector(this.targetElementSelector)
      .classList.remove('hcl-overlay-container-show');

    document
      .querySelector(this.targetElementSelector)
      .classList.remove('hcl-overlay-container-scroll');

    removeListeners('overflowId-' + this.overflowId, 'click');
    if (this.state.scrollListner) {
      removeListeners('overflowId-' + this.overflowId, 'scroll');
    }

    this.state.onToggle(false, type);
  };

  closeOverlay = e => {
    const targetElement = document.querySelector(this.targetElementSelector);
    if (targetElement) {
      if (e && targetElement.contains(e.target)) {
        return;
      }
      if (e && this.element && this.element.contains(e.target)) {
        return;
      }
      this.hide('outside');
    }
  };

  keyDownListner = e => {
    if (e.keyCode === 27) {
      this.hide('escape');
    } else if (e.keyCode === 9) {
      const focusableEls = document
        .querySelector(this.targetElementSelector)
        .querySelectorAll(
          'a[href]:not([disabled]):not([tabindex="-1"]), button:not([disabled]):not([tabindex="-1"]), textarea:not([disabled]):not([tabindex="-1"]), input[type="text"]:not([disabled]):not([tabindex="-1"]), input[type="radio"]:not([disabled]):not([tabindex="-1"]), input[type="checkbox"]:not([disabled]):not([tabindex="-1"]), select:not([disabled]):not([tabindex="-1"]), [tabindex]:not([tabindex="-1"])'
        );
      const firstFocusableEl = focusableEls[0];
      const lastFocusableEl = focusableEls[focusableEls.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstFocusableEl) {
          this.hide('focusout');
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusableEl) {
          this.hide('focusout');
          e.preventDefault();
        }
      }
    }
  };

  attachEvents = () => {
    this.element.addEventListener('click', () => {
      this.show();
    });

    if (
      this.state.closeOnEscape &&
      document.querySelector(this.targetElementSelector)
    ) {
      document
        .querySelector(this.targetElementSelector)
        .addEventListener('keydown', e => {
          this.keyDownListner(e);
        });
    }
  };
}

export default Overlay;
