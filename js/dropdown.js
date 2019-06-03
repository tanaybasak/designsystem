import { PREFIX } from "./utils/config";
import { NOOP } from "./utils/functions";
import { trackDocumentClick } from "./utils/dom";
import getCloset from "./utils/get-closest";
import handleDataBinding from "./utils/data-api";

class Dropdown {

  constructor(element, options) {
    this.element = element

    this.state = {
      isOpen: false,
      position: "bottom",
      selected: 0,
      onChange: NOOP,
      ...options
    };

    this.toggle = element.querySelector(`.${PREFIX}-dropdown-toggle`);

    this.position =
      this.state.position === "top"
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
    const selected = getCloset(subElement, className);
    if (selected) {
      selected.classList.remove(className);
    }
    subElement.classList.add(className);
  };

  attachEvents = () => {
    this.element.addEventListener("click", event => {
      event.stopPropagation();
      trackDocumentClick(this.element, () => {
        if (this.state.isOpen) {
          this.toggleState(!this.state.isOpen);
          this.state.isOpen = !this.state.isOpen;
        }
      });
      this.state.isOpen = !this.state.isOpen;
      this.toggleState(this.state.isOpen);
    });

    this.element
      .querySelectorAll(`.${PREFIX}-dropdown-item`)
      .forEach((item, index) => {
        item.addEventListener("click", event => {
          this.setSelection(event.target, `.${PREFIX}-dropdown-item-selected`);
          this.setValue(event.target.innerText);
          this.state.selected = index;
          if (typeof this.state.onChange === "function") {
            this.state.onChange(event, event.target.innerText);
          }
        });
      });
  }

  static handleDataAPI = () => {
    handleDataBinding("dropdown", function (element) {
      return new Dropdown(element, { isOpen: true });
    })
  }

}

export default Dropdown;
