import "../scss/main.scss";
import "./modal";
import "./tabs";
import "./content-switcher";
import Dropdown from "./dropdown";
import { isElement } from "./utils/dom";

const ComponentList = {
  dropdow: Dropdown
};

const attachElements = (selector, options, plugin) => {
  document.querySelectorAll(selector).forEach(element => {
    // Validate element type.
    if (isElement(element)) {
      const component = new plugin(element, options);
      if (typeof component.attachEvents === "function") {
        component.attachEvents.call(component, element);
      }
    } else {
      console.error("Invalid element provided.");
    }
  });
};

export const components = {
  dropdown: function(selector, options) {
    attachElements(selector, options, Dropdown);
  }
};

for (const componentName in ComponentList) {
  if (ComponentList.hasOwnProperty(componentName)) {
    const component = ComponentList[componentName];
    component.handleDataAPI();
  }
}

if (window) {
  window.patron = components;
}
