import { PREFIX } from './utils/config';
import { NOOP } from './utils/functions';
import handleDataBinding from './utils/data-api';
import getClosest from './utils/get-closest';
import focusNode from './utils/traverse-focus';

class ContentSwitcher {
  constructor(element, options) {
    this.element = element;

    this.selectors = {
      contentswitcher: `.${PREFIX}-content-switcher`,
      contentswitcherBtn: `.${PREFIX}-content-switcher-btn:not(:disabled)`,
      contentswitcherBtnAll: `.${PREFIX}-content-switcher-btn`,
      contentswitcherPanel: `.${PREFIX}-content-switcher-content > div`
    };

    this.state = {
      selectedIndex: 0,
      onChange: NOOP,
      selectedSwitchId: '',
      disabled: [],
      ...options
    };

    if (this.state.selectedIndex && this.state.selectedIndex > -1) {
      this.toggleSwitch(this.state.selectedIndex);
    }
  }

  toggleSwitch = target => {
    let panel = '';
    Array.from(
      this.element.querySelectorAll(this.selectors.contentswitcherBtnAll)
    ).forEach(item => {
      if (item) {
        item.classList.remove('active');
        item.setAttribute('aria-selected', false);
        panel = document.querySelector(item.dataset.target);
        panel.setAttribute('hidden', '');
        panel.setAttribute('aria-hidden', 'true');
      }
    });
    this.selectSwitch(target);
  };

  selectSwitch = target => {
    const switchItem = Array.from(
      this.element.querySelectorAll(this.selectors.contentswitcherBtnAll)
    ).find((item, index) => {
      return target === index;
    });
    let dataTarget = '';
    if (switchItem && this.element.contains(switchItem)) {
      if (!switchItem.getAttribute('disabled')) {
        switchItem.classList.add('active');
        switchItem.setAttribute('aria-selected', true);
        dataTarget = switchItem.dataset.target;
      }
      if (this.state.disabled && this.state.disabled.length > 0) {
        Array.from(
          this.element.querySelectorAll(this.selectors.contentswitcherBtnAll)
        ).forEach((item, index) => {
          if (this.state.disabled.indexOf(index) > -1) {
            item.disabled = true;
          }
        });
      }
      this.toggleSwitchPanel(dataTarget);
      this.changeState();
    }
  };

  changeState = () => {
    this.state.selectedIndex = Array.from(
      this.element.querySelectorAll(this.selectors.contentswitcherBtn)
    ).findIndex(item => {
      return item.classList.contains('active');
    });
  };

  toggleSwitchPanel = switchTarget => {
    const panel = document.querySelector(switchTarget);
    panel.removeAttribute('hidden');
    panel.setAttribute('aria-hidden', false);
  };

  clickEventListener = ev => {
    ev.preventDefault();
    const { currentTarget, target } = ev;
    const isBtn = currentTarget === target; // btn
    let element;
    if (isBtn) {
      element = currentTarget;
    } else {
      element = target.parentElement;
    }

    if (element.disabled) {
      return false;
    }

    const selectedIndex = Array.from(
      this.element.querySelectorAll(this.selectors.contentswitcherBtnAll)
    ).findIndex(item => {
      return element.isEqualNode(item);
    });

    if (ev.target.matches('button')) {
      ev.target.focus();
    }

    this.toggleSwitch(selectedIndex);
    if (this.state.onChange) {
      this.state.onChange(ev);
    }
  };

  keyDownOnContextSwitch = e => {
    const key = e.which || e.keyCode;
    const currentElem = e.currentTarget;
    switch (key) {
      case 39: {
        focusNode(currentElem, 'next');
        e.preventDefault();
        break;
      }
      case 37: {
        focusNode(currentElem, 'previous');
        e.preventDefault();
        break;
      }
      default:
        break;
    }
  };

  attachEvents = () => {
    const contentswitcher = Array.from(
      this.element.querySelectorAll(this.selectors.contentswitcherBtnAll)
    );
    const len = contentswitcher.length;
    for (let i = 0; i < len; i++) {
      contentswitcher[i].addEventListener(
        'click',
        this.clickEventListener.bind(this)
      );

      contentswitcher[i].addEventListener('keydown', e => {
        this.keyDownOnContextSwitch(e);
      });
    }
  };

  static handleDataAPI = () => {
    handleDataBinding('contentswitcher', function (element, target) {
      let idx = 0;
      if (element && target) {
        target = getClosest(target, `.${PREFIX}-content-switcher-btn`);
        if (target.disabled) {
          return false;
        }
        idx = Array.from(
          element.querySelectorAll(`.${PREFIX}-content-switcher-btn`)
        ).findIndex(item => {
          return item.isEqualNode(target);
        });
      }
      return new ContentSwitcher(element, {
        selectedIndex: idx || 0,
        disabled: []
      });
    });
  };
}
export default ContentSwitcher;
