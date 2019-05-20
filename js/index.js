import "../scss/main.scss";
import "./modal";
import "./tabs";
import "./content-switcher";
import Dropdown from "./dropdown";

const attachElements = (selector, options, plugin) => {
  document.querySelectorAll(selector).forEach(element => {
    new plugin(element, options);
  });
};

export const components = {
  dropdown: function(selector, options) {
    attachElements(selector, options, Dropdown);
  }
};

if (window) {
  window.patron = components;
}
