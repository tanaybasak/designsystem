import "../scss/main.scss";
import "./modal";
import "./tabs";
import Tabs from "./tabs";
import "./content-switcher";
import './navigation';
import { isElement } from "./utils/dom";
import Dropdown from "./dropdown";
import Tooltip from "./tooltip";
import DatePicker from "./datePicker";

const ComponentList = {
    dropdow: Dropdown,
    datepicker: DatePicker,
    tabs: Tabs
}

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
    },
    datepicker: function (selector, options) {
        attachElements(selector, options, DatePicker);
    }
};

for (const componentName in ComponentList) {
    if (ComponentList.hasOwnProperty(componentName)) {
        const component = ComponentList[componentName];
        if (typeof component.handleDataAPI === "function") {
            component.handleDataAPI();
        }
    }
}

// const DOMinit = () => {
//     autoInit.forEach((Obj) => {
//         if (typeof Obj['comp'] === "function" && Obj['selector'] !== '') {
//             attachElements(Obj['selector'], {}, Obj['comp']);
//         }
//     });
// }

if (window) {
    window.patron = components;
}