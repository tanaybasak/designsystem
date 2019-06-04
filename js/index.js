import "../scss/main.scss";
import "./modal";
import "./tabs";
import Tabs from "./tabs";
import "./content-switcher";
import Dropdown from "./dropdown";
import { isElement } from "./utils/dom";
import Tooltip from "./tooltip";

const ComponentList = {
    dropdow: Dropdown
};

const AutoInit = [
    { comp: Tabs, selector: '[data-component="tabs"]' }
];

const attachElements = (selector, options, plugin) => {
    Array.from(document.querySelectorAll(selector)).forEach(element => {
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
    dropdown: function (selector, options) {
        attachElements(selector, options, Dropdown);
    },
    tabs: function (selector, options) {
        attachElements(selector, options, Tabs);
    },
    tooltip: function (selector, options) {
        attachElements(selector, options, Tooltip);
    }
};

for (const componentName in ComponentList) {
    if (ComponentList.hasOwnProperty(componentName)) {
        const component = ComponentList[componentName];
        component.handleDataAPI();
    }
}

const DOMinit = () => {
    AutoInit.forEach((Obj) => {
        if (typeof Obj['comp'] === "function" && Obj['selector'] !== '') {
            attachElements(Obj['selector'], {}, Obj['comp']);
        }
    });
}

if (window) {
    window.patron = components;
    document.addEventListener("DOMContentLoaded", DOMinit);
}