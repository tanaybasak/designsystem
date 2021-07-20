import { PREFIX } from './utils/config';

class Slideout {
  constructor(element, options) {
    this.element = element;

    this.state = {
      slideoutStatus: false,
      closeOnEscape: false,
      callFromHeader: false,
      ...options
    };
  }

  focusTrap = e => {
    const modal = document.getElementById(
      this.element.getAttribute('data-target').slice(1)
    );
    const focusableEls = modal.querySelectorAll(
      'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled]), [tabindex]'
    );
    const firstFocusableEl = focusableEls[0];
    const lastFocusableEl = focusableEls[focusableEls.length - 1];
    if (e.keyCode === 27) {
      if (this.state.keyboard) {
        e.preventDefault();
        this.hideModal(modal);
      }
    }

    const isTabPressed = e.key === 'Tab' || e.keyCode === '9';

    if (!isTabPressed) {
      return;
    }

    if (e.shiftKey) {
      if (document.activeElement === firstFocusableEl) {
        lastFocusableEl.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastFocusableEl) {
        firstFocusableEl.focus();
        e.preventDefault();
      }
    }
  };

  showSlideout = slideout => {
    const slideoutLayout = slideout.querySelector(`.${PREFIX}-slideout-layout`);
    this.slideoutStatus = true;
    if (slideout == null) return;
    slideout.classList.remove(`${PREFIX}-slideout-hide`);
    document.body.classList.add('overflow-slideout');
    requestAnimationFrame(() => {
      slideoutLayout.classList.remove('hide');
      slideoutLayout.classList.add('show');
    });
  };

  hideSlideout = slideout => {
    const slideoutLayout = slideout.querySelector(`.${PREFIX}-slideout-layout`);
    this.slideoutStatus = false;
    if (slideout == null) return;
    requestAnimationFrame(() => {
      slideoutLayout.classList.remove('show');
      slideoutLayout.classList.add('hide');
    });
    setTimeout(() => {
      slideout.classList.add(`${PREFIX}-slideout-hide`);
      document.body.classList.remove('overflow-slideout');
    }, 200);
  };

  callSlideOutToggle = slideout => {
    if (this.state.slideoutStatus) {
      this.hideSlideout(slideout);
    } else {
      this.showSlideout(slideout);
    }
  };

  attachEvents = () => {
    const element = this.element.getAttribute('data-target');
    let slideout;
    if (element) {
      slideout = document.querySelector(`${element}`);
    }

    if (this.state.callFromHeader) {
      this.callSlideOutToggle(slideout);
    } else {
      this.element.addEventListener('click', () => {
        this.callSlideOutToggle(slideout);
      });
    }

    const slideoutMask = slideout.querySelector(`.${PREFIX}-slideout-mask`);

    const closeSlideoutBtn = slideout.querySelectorAll(
      `.${PREFIX}-slideout-close`
    );

    slideout.addEventListener('keydown', this.focusTrap);

    closeSlideoutBtn.forEach(button => {
      button.addEventListener('click', () => {
        const slideout = button.closest(`.${PREFIX}-slideout`);
        this.hideSlideout(slideout);
      });
    });

    document.addEventListener('keydown', event => {
      if (event.keyCode === 27 && this.state.closeOnEscape) {
        this.hideSlideout(slideout);
      }
    });

    if (slideoutMask) {
      slideoutMask.addEventListener('click', () => {
        this.hideSlideout(slideout);
      });
    }
  };
}
export default Slideout;
