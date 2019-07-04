import "../scss/main.scss";
import "./modal";
import './navigation';
import ContentSwitcher from "./content-switcher";
import Dropdown from "./dropdown";
import Navigation from "./navigation"
import Search from "./search"
import { isElement } from "./utils/dom";
import Tabs from "./tabs";
import Tooltip from "./tooltip";
import DatePicker from "./datePicker";
import NumberInput from "./numberInput";
import Pagination from "./pagination";
import Accordion from "./accordion"

const ComponentList = {
    dropdow: Dropdown,
    navigation: Navigation,
    search: Search,
    datepicker: DatePicker,
    tabs: Tabs,
    contentswitcher: ContentSwitcher,
    numberInput: NumberInput,
    pagination: Pagination,
    accordion: Accordion
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
    navigation: function (selector, options) {
        attachElements(selector, options, Navigation);
    },
    search: function (selector, options) {
        attachElements(selector, options, Search);
    },
    datepicker: function (selector, options) {
        attachElements(selector, options, DatePicker);
    },
    numberInput: function (selector, options) {
        attachElements(selector, options, NumberInput);
    },
    contentswitch: function (selector, options) {
        attachElements(selector, options, ContentSwitcher);
    },
    accordion: function (selector, options) {
        attachElements(selector, options, Accordion);
    }
};

if (window) {
    window.patron = components;
}

export default patron;

