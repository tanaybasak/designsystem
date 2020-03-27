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
      onChange: NOOP,
      ...options
    };
    this.toggle = element.querySelector(`.${PREFIX}-dropdown-toggle`);
    this.toggleState(this.state.isOpen);
  }

  setValue = value => {
    this.toggle.innerText = value;
  };

  toggleState = state => {
    if (state) {
      const dropdownMenu = this.element.querySelector(
        `.${PREFIX}-dropdown-container`
      );
      let outOfBound = false;
      addListener(
        'overflow-' + this.overflowId,
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
      removeListeners('overflow-' + this.overflowId, 'click');
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
    const nodeStatus = this.element.classList.contains(
      `${PREFIX}-dropdown-open`
    );

    if (nodeStatus) {
      switch (key) {
        case 40: {
          if (!listItem.nextElementSibling) {
            this.focusNode(listItem.parentElement.firstElementChild);
          } else if (listItem.nextElementSibling.disabled === true) {
            this.focusNode(listItem.nextElementSibling.nextElementSibling);
          } else {
            this.focusNode(listItem.nextElementSibling);
          }
          e.preventDefault();
          break;
        }
        case 38: {
          if (!listItem.previousElementSibling) {
            this.focusNode(listItem.parentElement.lastElementChild);
          } else if (listItem.previousElementSibling.disabled === true) {
            this.focusNode(
              listItem.previousElementSibling.previousElementSibling
            );
          } else {
            this.focusNode(listItem.previousElementSibling);
          }
          e.preventDefault();
          break;
        }
        case 13: {
          e.preventDefault();
          e.target.click();
          break;
        }
        default:
          break;
      }
    }
  };

  keydownButton = e => {
    const key = e.which || e.keyCode;
    const listItems = e.target.nextElementSibling;
    if (key === 40) {
      e.preventDefault();
      this.focusNode(listItems.firstElementChild);
    } else if (key === 38) {
      e.preventDefault();
      this.focusNode(listItems.lastElementChild);
    }
  };

  attachEvents = () => {
    const dropdownBtn = this.element.querySelector(
      `.${PREFIX}-dropdown-toggle`
    );
    const dropdownMenu = this.element.querySelector(
      `.${PREFIX}-dropdown-container`
    );

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

      this.element
        .querySelectorAll(`.${PREFIX}-dropdown-item`)
        .forEach((item, index) => {
          item.addEventListener('click', event => {
            this.setSelection(
              event.target,
              `.${PREFIX}-dropdown-item-selected`
            );
            this.setValue(event.target.innerText);
            this.state.selected = index;
            if (typeof this.state.onChange === 'function') {
              this.state.onChange(event, event.target.innerText);
              this.state.isOpen = !this.state.isOpen;
              this.toggleState(this.state.isOpen);
            }
          });
        });
    }
  };

  static handleDataAPI = () => {
    handleDataBinding('dropdown', function(element) {
      return new Dropdown(element, { isOpen: true });
    });
  };
}

export default Dropdown;
