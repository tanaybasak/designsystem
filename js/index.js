import '../scss/main.scss';
import './modal';
import './tabs';
import './content-switcher';
import DatePicker from "./datePicker";

const attachElements = (selector, plugin) => {
    document.querySelectorAll(selector).forEach(element => {
        new plugin(element);
    });
};

export const components = {
    datePicker: function (selector) {
        attachElements(selector, DatePicker);
    }
};

if (window) {
    window.patron = components;
}