import { PREFIX } from './utils/config';
import { NOOP } from './utils/functions';
import handleDataBinding from './utils/data-api';
import Overlay from './overlay';
import getClosest from './utils/get-closest';
import { setAttribute } from './utils/dom';

class Dropdown {
  constructor(element, options) {
    this.element = element;
    this.state = {
      isOpen: false,
      position: 'bottom',
      selected: 0,
      type: 'single',
      onChange: NOOP,
      attachElementToBody: false,
      scrollListner: false,
      direction: 'bottom-left',
      closeOnEscape: true,
      ...options
    };

    if (options.position === 'top') {
      this.state.direction = 'top-left';
    }
    this.overlay = null;
    this.dropdownBtn = element.querySelector(`.${PREFIX}-dropdown-toggle`);
    this.dropdownMenu = element.querySelector(`.${PREFIX}-dropdown-menu`);
  }

  setValue = value => {
    this.dropdownBtn.innerText = value;
  };

  setMultiSelectVal = value => {
    this.element.querySelector(`.${PREFIX}-tag-text`).innerText = value;
    setAttribute(
      this.element.querySelector(`.${PREFIX}-tag-text`),
      'aria-label',
      `${value}-selected options`
    );
  };

  focusNode = node => {
    if (node) {
      node.focus();
    }
  };

  keyDownOnDropdown = e => {
    const key = e.which || e.keyCode;
    const listItem = e.target;

    if (key === 40) {
      e.preventDefault();
      if (!listItem.nextElementSibling) {
        this.focusNode(listItem.parentElement.firstElementChild);
      } else {
        this.focusNode(listItem.nextElementSibling);
      }
    } else if (key === 38) {
      e.preventDefault();
      if (!listItem.previousElementSibling) {
        this.focusNode(listItem.parentElement.lastElementChild);
      } else {
        this.focusNode(listItem.previousElementSibling);
      }
    } else if (key === 13 || key === 32) {
      e.preventDefault();
      this.selectDropdownItem(event);
    }
  };

  keydownButton = e => {
    if (e.target.classList.contains(`${PREFIX}-tag-close`)) {
      return;
    }
    const key = e.which || e.keyCode;

    if (this.state.isOpen) {
      if (key === 40) {
        e.preventDefault();
        this.focusNode(this.dropdownMenu.firstElementChild);
      } else if (key === 38) {
        e.preventDefault();
        this.focusNode(this.dropdownMenu.lastElementChild);
      }
    } else {
      if (key === 38 || key === 40 || key === 13) {
        e.preventDefault();
        if (!this.state.isOpen) {
          this.overlay.show();
        }
      }
    }
  };

  attachEvents = () => {
    const tag = this.element.querySelector(`.${PREFIX}-tag-primary`);

    if (this.dropdownBtn) {
      this.dropdownBtn.addEventListener('keydown', e => {
        this.keydownButton(e);
      });

      this.dropdownMenu.addEventListener('keydown', e => {
        this.keyDownOnDropdown(e);
      });

      this.overlay = new Overlay(this.dropdownBtn, {
        attachElementToBody: this.state.attachElementToBody,
        scrollListner: this.state.scrollListner,
        direction: this.state.direction,
        closeOnEscape: true,
        onToggle: (status, type) => {
          this.state.isOpen = status;
          if (status) {
            this.dropdownMenu.style.width =
              this.dropdownBtn.offsetWidth - 2 + 'px';
            if (this.overlay.state.currentDirection.startsWith('top')) {
              this.dropdownMenu.classList.add(`${PREFIX}-dropdown-top`);
            } else {
              this.dropdownMenu.classList.remove(`${PREFIX}-dropdown-top`);
            }
            this.dropdownMenu.firstElementChild.focus();
          } else {
            if (type !== 'outside') {
              this.dropdownBtn.focus();
            }
          }
        }
      });
      this.overlay.setTargetElement(this.dropdownMenu.parentElement);
      this.overlay.attachEvents();

      if (tag) {
        tag
          .querySelector(`.${PREFIX}-tag-close`)
          .addEventListener('click', this.clearMultiselectDropdownItem);
      }

      this.element
        .querySelectorAll(`.${PREFIX}-dropdown-item`)
        .forEach(item => {
          item.addEventListener('click', this.selectDropdownItem);
        });
    }
  };

  clearMultiselectDropdownItem = event => {
    const tag = this.dropdownBtn.querySelector(`.${PREFIX}-tag-primary`);
    event.stopPropagation();
    tag.classList.add(`hidden`);
    const list = this.dropdownMenu.querySelectorAll('input:checked');
    list.forEach(item => {
      item.checked = false;
    });
    this.dropdownBtn.focus();
    if (typeof this.state.onChange === 'function') {
      this.state.onChange(event, null);
    }
  };

  selectDropdownItem = event => {
    const dropdownItem = getClosest(event.target, `.${PREFIX}-dropdown-item`);
    if (this.state.type === 'multi') {
      const input = dropdownItem.querySelector('input');
      input.checked = !input.checked;
      const list = this.dropdownMenu.querySelectorAll('input:checked');
      const tag = this.dropdownBtn.querySelector(`.${PREFIX}-tag-primary`);
      if (list.length) {
        this.setMultiSelectVal(list.length);
        tag.classList.remove(`hidden`);
      } else {
        tag.classList.add(`hidden`);
      }
    } else {
      this.overlay.hide('select');
      this.dropdownBtn.focus();
      this.setValue(dropdownItem.textContent.trim());
    }

    if (typeof this.state.onChange === 'function') {
      this.state.onChange(event, dropdownItem);
    }
  };

  static handleDataAPI = () => {
    handleDataBinding('dropdown', function (element) {
      return new Dropdown(element, {
        isOpen: true,
        type: element.getAttribute('data-type')
      });
    });
  };
}

export default Dropdown;
