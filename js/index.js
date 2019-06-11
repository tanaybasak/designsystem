import "../scss/main.scss";
import { isElement } from "./utils/dom";
import "./modal";
import './navigation';
import "./content-switcher";
import Dropdown from "./dropdown";
import Tabs from "./tabs";
import Tooltip from "./tooltip";
import DatePicker from "./datePicker";
import NumberInput from "./numberInput";

const ComponentList = {
    dropdow: Dropdown,
    datepicker: DatePicker,
    tabs: Tabs,
    numberInput: NumberInput
}

for (const componentName in ComponentList) {
    if (ComponentList.hasOwnProperty(componentName)) {
        const component = ComponentList[componentName];
        if (typeof component.handleDataAPI === "function") {
            component.handleDataAPI();
        }
    }
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
    },
    numberInput: function (selector, options) {
        attachElements(selector, options, NumberInput);
    },
};

if (window) {
    window.patron = components;
}