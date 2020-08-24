import { PREFIX } from './utils/config';
import { addListener, removeListeners } from './eventManager';
import { getPositions, visibleY } from './utils/overlayUtil';
import debounceFunction from './utils/debounce';
import { NOOP } from './utils/functions';
let overlayRef = 0;
class Overlay {
  constructor(element, options) {
    this.element = element;
    this.overlayId = overlayRef++;
    this.targetElementSelector = element.getAttribute('data-target');

    this.targetElement = document.querySelector(this.targetElementSelector);

    this.overlayStatus = false;
    this.state = {
      direction: 'bottom-left',
      currentDirection: 'bottom-left',
      scrollListner: false,
      onToggle: NOOP,
      attachElementToBody: false,
      closeOnEscape: false,
      preventCloseElements: [],
      ...options
    };
  }

  setTargetElement = ele => {
    this.targetElement = ele;
  };

  updateOverlayContainerPosition() {
    const elementInfo = this.targetElement.getBoundingClientRect();
    const positions = getPositions(
      this.state.direction,
      elementInfo.width,
      elementInfo.height,
      this.element,
      this.state.attachElementToBody
    );
    this.targetElement.style.top = positions.top;
    this.targetElement.style.left = positions.left;
    this.state.currentDirection = positions.direction;
    console.log('this.state.currentDirection', this.state.currentDirection);
  }

  show = () => {
    this.overlayStatus = true;
    if (this.state.attachElementToBody) {
      document.body.appendChild(this.targetElement);
    }
    this.updateOverlayContainerPosition();
    this.targetElement.classList.add(`${PREFIX}-overlay-container-show`);
    if (
      this.element.parentElement &&
      this.element.parentElement.classList.contains(`${PREFIX}-overlay-wrapper`)
    ) {
      this.element.parentElement.classList.add(
        `${PREFIX}-overlay-wrapper-active`
      );
    }
    addListener(
      'overlayRef-' + this.overlayId,
      'click',
      e => {
        this.closeOverlay(e);
      },
      true
    );

    if (this.state.scrollListner) {
      addListener(
        'overlayRef-' + this.overlayId,
        'scroll',
        e => {
          this.handleScroll(e);
        },
        true
      );
    }
    this.state.onToggle(true);
  };

  handleScroll() {
    debounceFunction(
      this.updateOverlayContainerPositionOnScroll.bind(this),
      200
    );
  }

  updateOverlayContainerPositionOnScroll() {
    if (visibleY(this.element)) {
      this.updateOverlayContainerPosition();
      this.targetElement.classList.add(`${PREFIX}-overlay-container-scroll`);
      this.targetElement.classList.remove(`${PREFIX}-overlay-container-hidden`);
    } else {
      this.targetElement.classList.add(`${PREFIX}-overlay-container-hidden`);
    }
  }

  hide = type => {
    this.overlayStatus = false;
    this.targetElement.classList.remove(`${PREFIX}-overlay-container-show`);
    this.targetElement.classList.remove(`${PREFIX}-overlay-container-scroll`);
    if (
      this.element.parentElement &&
      this.element.parentElement.classList.contains(`${PREFIX}-overlay-wrapper`)
    ) {
      this.element.parentElement.classList.remove(
        `${PREFIX}-overlay-wrapper-active`
      );
    }
    removeListeners('overlayRef-' + this.overlayId, 'click');
    if (this.state.scrollListner) {
      removeListeners('overlayRef-' + this.overlayId, 'scroll');
    }
    this.state.onToggle(false, type);
  };

  closeOverlay = e => {
    if (this.targetElement) {
      if (e && this.targetElement.contains(e.target)) {
        return;
      }
      if (e && this.element && this.element.contains(e.target)) {
        return;
      }
      let canClose = true;
      if (
        this.state.preventCloseElements &&
        this.state.preventCloseElements.length > 0
      ) {
        this.state.preventCloseElements.forEach(element => {
          if (e && element && element.contains(e.target)) {
            canClose = false;
          }
        });
      }
      if (canClose) {
        this.hide('outside');
      }
    }
  };

  keyDownListner = e => {
    if (e.keyCode === 27 && this.state.closeOnEscape) {
      this.hide('escape');
    } else if (e.keyCode === 9) {
      const focusableEls = this.targetElement.querySelectorAll(
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
      if (this.overlayStatus) {
        this.hide();
      } else {
        this.show();
      }
    });

    if (this.targetElement) {
      this.targetElement.addEventListener('keydown', e => {
        this.keyDownListner(e);
      });
    }
  };
}

export default Overlay;
