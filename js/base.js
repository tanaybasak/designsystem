import { PREFIX } from "./utils/config";
import { NOOP } from "./utils/functions";

class Base {
  defaults = {
    isOpen: false,
    position: "bottom",
    selected: 0,
    onChange: NOOP
  };

  constructor(element, options) {
    if (!isElement(element)) {
      console.error("Invalid element provided.");
      return false;
    }
    this.state = { ...defaults, ...options };
    this.element = element;
    init();
  }

  setPosition() {
    this.state.position === "top"
      ? `${PREFIX}-dropdown-top`
      : `${PREFIX}-dropdown-bottom`;

    this.element.classList.add(this.state.position);
  }

  setSelection(subElement, className) {
    const selected = getCloset(subElement, className);
    if (selected) {
      selected.classList.remove(className);
    }
    subElement.classList.add(className);
  };

  attachEvents() {
    // Toggle
    element.addEventListener("click", event => {
      event.stopPropagation();
      trackDocumentClick(element, () => {
        toggleState(false);
      });
      state.isOpen = !state.isOpen;
      toggleState(state.isOpen);
    }); 
    // Item
    this.element
      .querySelectorAll(`.${PREFIX}-dropdown-item`)
      .forEach((element, index) => {
        element.addEventListener("click", event => {
          setSelection(event.target, `.${PREFIX}-dropdown-item-selected`);
          setValue(event.target.innerText);
          state.selected = index;
          if (typeof state.onChange === "function") {
            state.onChange(event, event.target.innerText);
          }
        });
      });
  }

  init() {
    this.toggle = element.querySelector(`.${PREFIX}-dropdown-toggle`);
    setPosition();
    attachEvents();
  }
}

export default Dropdown;
