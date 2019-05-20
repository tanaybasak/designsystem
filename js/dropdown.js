import { PREFIX } from "./utils/config";
import { NOOP } from "./utils/functions";
import { isElement, trackDocumentClick } from "./utils/dom";
import getCloset from "./utils/get-closest";

const Dropdown = function(element, options) {
  if (!isElement(element)) {
    console.error("Invalid element provided.");
    return false;
  }

  const state = {
    isOpen: false,
    position: "bottom",
    selected: 0,
    onChange: NOOP,
    ...options
  };

  const toggle = element.querySelector(`.${PREFIX}-dropdown-toggle`);

  const position =
    state.position === "top"
      ? `${PREFIX}-dropdown-top`
      : `${PREFIX}-dropdown-bottom`;

  const setValue = value => {
    toggle.innerText = value;
  };

  const toggleState = state => {
    if (state) {
      element.classList.add(`${PREFIX}-dropdown-open`);
      element.classList.remove(`${PREFIX}-dropdown-close`);
    } else {
      element.classList.remove(`${PREFIX}-dropdown-open`);
      element.classList.add(`${PREFIX}-dropdown-close`);
    }
  };

  const setSelection = (subElement, className) => {
    const selected = getCloset(subElement, className);
    if (selected) {
      selected.classList.remove(className);
    }
    subElement.classList.add(className);
  };

  // Set Defaults
  toggleState(state.isOpen);
  element.classList.add(position);
  // Attach events
  element.addEventListener("click", event => {
    event.stopPropagation();
    trackDocumentClick(element, () => {
      toggleState(false);
      state.isOpen = !state.isOpen;
    });
    state.isOpen = !state.isOpen;
    toggleState(state.isOpen);
  });

  element
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
};

export default Dropdown;
