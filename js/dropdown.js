import { PREFIX } from './utils/config';
import { NOOP } from './utils/functions';
import { trackDocumentClick } from './utils/dom';
import getClosest from './utils/get-closest';
import handleDataBinding from './utils/data-api';

class Dropdown {
  constructor(element, options) {
    this.element = element;
    this.state = {
      isOpen: false,
      position: 'bottom',
      selected: 0,
      onChange: NOOP,
      ...options
    };
    this.toggle = element.querySelector(`.${PREFIX}-dropdown-toggle`);
    this.position =
      this.state.position === 'top'
        ? `${PREFIX}-dropdown-top`
        : `${PREFIX}-dropdown-bottom`;

    this.toggleState(this.state.isOpen);
    this.element.classList.add(this.position);
  }

  setValue = value => {
    this.toggle.innerText = value;
  };

  toggleState = state => {
    if (state) {
      this.element.classList.add(`${PREFIX}-dropdown-open`);
      this.element.classList.remove(`${PREFIX}-dropdown-close`);
    } else {
      this.element.classList.remove(`${PREFIX}-dropdown-open`);
      this.element.classList.add(`${PREFIX}-dropdown-close`);
    }
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

  keyDownOnTree = e => {
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

      dropdownMenu.addEventListener('keydown', e => {
        this.keyDownOnTree(e);
      });

      trackDocumentClick(this.element, () => {
        if (this.state.isOpen) {
          this.toggleState(!this.state.isOpen);
          this.state.isOpen = !this.state.isOpen;
        }
      });
      dropdownBtn.addEventListener('click', event => {
        event.stopPropagation();
        trackDocumentClick(this.element, () => {
          if (this.state.isOpen) {
            this.toggleState(!this.state.isOpen);
            this.state.isOpen = !this.state.isOpen;
          }
        });
        this.state.isOpen = !this.state.isOpen;
        this.toggleState(this.state.isOpen);
        this.focusNode(dropdownMenu.children[0]);
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
