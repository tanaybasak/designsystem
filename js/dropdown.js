import { PREFIX } from './utils/config';
import { NOOP } from './utils/functions';
import { addListener, removeListeners } from './eventManager';
import getClosest from './utils/get-closest';
import handleDataBinding from './utils/data-api';

let dropdownIdRef = 0;
class Dropdown {
  constructor(element, options) {
    this.element = element;
    this.dropDownId = dropdownIdRef++;
    this.state = {
      isOpen: false,
      position: 'bottom',
      selected: 0,
      type: 'single',
      onChange: NOOP,
      ...options
    };
    this.toggle = element.querySelector(`.${PREFIX}-dropdown-toggle`);
    this.toggleState(this.state.isOpen);
  }

  setValue = value => {
    this.toggle.innerText = value;
  };

  setMultiSelectVal = value => {
    this.element.querySelector(`.${PREFIX}-tag-text`).innerText = value;
    this.element
      .querySelector(`.${PREFIX}-tag-text`)
      .setAttribute('aria-label', `${value}-selected options`);
  };

  toggleState = state => {
    if (state) {
      const dropdownMenu = this.element.querySelector(
        `.${PREFIX}-dropdown-container`
      );
      let outOfBound = false;
      addListener(
        'dropdown-' + this.dropDownId,
        'click',
        e => {
          this.handleClick(e);
        },
        true
      );
      this.element.classList.add(`${PREFIX}-dropdown-open`);
      this.element.classList.remove(`${PREFIX}-dropdown-close`);
      this.updatePos(outOfBound);
      if (!this.isInViewport(dropdownMenu)) {
        outOfBound = true;
        this.updatePos(outOfBound);
      }
    } else {
      removeListeners('dropdown-' + this.dropDownId, 'click');
      this.element.classList.remove(`${PREFIX}-dropdown-open`);
      this.element.classList.add(`${PREFIX}-dropdown-close`);
    }
  };

  updatePos = outOfBound => {
    let setPosition;
    let removePosition;
    if (!outOfBound) {
      setPosition =
        this.state.position === 'top'
          ? `${PREFIX}-dropdown-top`
          : `${PREFIX}-dropdown-bottom`;

      removePosition =
        this.state.position === 'top'
          ? `${PREFIX}-dropdown-bottom`
          : `${PREFIX}-dropdown-top`;
    } else {
      setPosition =
        this.state.position === 'top'
          ? `${PREFIX}-dropdown-bottom`
          : `${PREFIX}-dropdown-top`;

      removePosition =
        this.state.position === 'top'
          ? `${PREFIX}-dropdown-top`
          : `${PREFIX}-dropdown-bottom`;
    }
    this.element.classList.add(setPosition);
    this.element.classList.remove(removePosition);
  };

  handleClick = e => {
    if (this.element) {
      if (e && this.element.contains(e.target)) {
        return;
      }
      this.state.isOpen = !this.state.isOpen;
      this.toggleState(this.state.isOpen);
    }
  };

  isInViewport = elem => {
    const bounding = elem.getBoundingClientRect();
    return (
      bounding.top >= 0 &&
      bounding.left >= 0 &&
      bounding.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      bounding.right <=
        (window.innerWidth || document.documentElement.clientWidth)
    );
  };

  setSelection = (subElement, className) => {
    const selected = getClosest(subElement, className);
    if (selected) {
      selected.classList.remove(className);
    }
    subElement.classList.add(className);
  };

  focusNode = node => {
    if (node.classList.contains(`${PREFIX}-dropdown-item`)) {
      node.children[0].focus();
    }
  };

  keyDownOnDropdown = e => {
    const key = e.which || e.keyCode;
    const listItem = e.target.parentElement;

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
      e.target.click();
    }
  };

  keydownButton = e => {
    const key = e.which || e.keyCode;
    const listItems = e.target.nextElementSibling;
    if (this.state.isOpen) {
      if (key === 40) {
        e.preventDefault();
        this.focusNode(listItems.firstElementChild);
      } else if (key === 38) {
        e.preventDefault();
        this.focusNode(listItems.lastElementChild);
      }
    } else {
      if (key === 38 || key === 40) {
        e.preventDefault();
        e.target.click();
      }
    }
  };

  attachEvents = () => {
    const dropdownBtn = this.element.querySelector(
      `.${PREFIX}-dropdown-toggle`
    );
    const dropdownMenu = this.element.querySelector(
      `.${PREFIX}-dropdown-container`
    );

    const tag = this.element.querySelector(`.${PREFIX}-tag-primary`);

    if (dropdownBtn) {
      dropdownBtn.addEventListener('keypress', function(event) {
        if (event.keyCode === 13) {
          event.preventDefault();
          dropdownBtn.click();
        }
      });

      dropdownBtn.addEventListener('keydown', e => {
        this.keydownButton(e);
      });

      dropdownMenu.addEventListener('keydown', e => {
        this.keyDownOnDropdown(e);
      });

      dropdownBtn.addEventListener('click', event => {
        event.stopPropagation();
        this.state.isOpen = !this.state.isOpen;
        this.toggleState(this.state.isOpen);
        dropdownBtn.focus();
      });

      if (tag) {
        this.element
          .querySelector(`.${PREFIX}-close`)
          .addEventListener('click', event => {
            event.stopPropagation();
            tag.classList.add(`hidden`);
            const list = dropdownMenu.querySelectorAll('input:checked');
            list.forEach(item => {
              item.checked = false;
            });
          });
      }

      this.element
        .querySelectorAll(`.${PREFIX}-dropdown-item`)
        .forEach((item, index) => {
          item.addEventListener('click', event => {
            this.setSelection(
              event.target,
              `.${PREFIX}-dropdown-item-selected`
            );
            this.state.selected = index;
            const input = item.querySelector('input');
            const multiItem = item.querySelector(`.${PREFIX}-checkbox-item`);
            if (this.state.type === 'multi') {
              input.checked = !input.checked;
              multiItem.setAttribute('aria-checked', input.checked);
              const list = dropdownMenu.querySelectorAll('input:checked');
              if (list.length) {
                this.setMultiSelectVal(list.length);
                tag.classList.remove(`hidden`);
              } else {
                tag.classList.add(`hidden`);
              }
            } else {
              dropdownBtn.focus();
              this.setValue(event.target.innerText);
            }
            if (typeof this.state.onChange === 'function') {
              this.state.onChange(event, event.target.innerText);
              if (this.state.type === 'single') {
                this.state.isOpen = !this.state.isOpen;
                this.toggleState(this.state.isOpen);
              }
            }
          });
        });
    }
  };

  static handleDataAPI = () => {
    handleDataBinding('dropdown', function(element) {
      return new Dropdown(element, {
        isOpen: true,
        type: element.getAttribute('data-type')
      });
    });
  };
}

export default Dropdown;
