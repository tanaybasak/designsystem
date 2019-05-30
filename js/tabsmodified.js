import { PREFIX } from "./utils/config";
import { NOOP } from "./utils/functions";
import { trackDocumentClick } from "./utils/dom";
import getCloset from "./utils/get-closest";
import handleDataBinding from "./utils/data-api";

class Tabs {
    constructor(element, options) {
        this.element = element;
        this.tabs = Array.from(element.querySelectorAll("li"));
        this.tabpanels = Array.from(element.querySelectorAll(`.${PREFIX}-tabcontent div.${PREFIX}-tabs-panel`));
        this.events = {
            onChange: new Event('onChange')
        }
        this.state = {
            selectedIndex: 0,
            onChange: NOOP
        };
    }

    clickEventListener = (e) => {
        e.preventDefault();
        const { currentTarget, target } = e;
        const isLi = currentTarget === target;
        let tabId, tabItem;
        if (isLi) {
            tabId = currentTarget.firstElementChild.getAttribute("href").slice(1);
            tabItem = currentTarget;
        }
        else {
            tabId = target.getAttribute("href").slice(1);
            tabItem = target.parentElement;
        }

        if (tabId && !tabItem.classList.contains(`${PREFIX}-tabs-disabled`)) {
            this.toggleTab(tabId);
            this.toggleTabPanel(tabId);
        }
    }

    onChange = (e) => {
        console.log(Object.assign(e, { selectedIndex: this.state.selectedIndex }));
    }

    toggleTab = (target) => {
        this.tabs.forEach((item) => {
            if (item) {
                item.classList.remove("active");
                item.setAttribute("aria-selected", false);
            }
        });
        this.selectTab(target);
    }

    selectTab = (target) => {
        const link = this.element.querySelector(`a[href="#${target}"]`);
        if (document.body.contains(link)) {
            if (!link.parentElement.classList.contains(`${PREFIX}-tabs-disabled`)) {
                link.parentElement.classList.add('active');
                link.parentElement.setAttribute("aria-selected", true);
            }
        }
        this.changeState();
        link.parentElement.dispatchEvent(this.events.onChange);
    }

    toggleTabPanel = (tabId) => {
        this.tabpanels.forEach((item) => {
            if (item) {
                item.classList.remove("active");
            }
        });
        this.selectTabPanel(tabId);
    }

    selectTabPanel = (tabId) => {
        const tabPanel = this.element.querySelector(`div[id="${tabId}"]`);
        if (tabPanel) {
            tabPanel.classList.add("active");
        }
    }

    changeState = () => {
        this.state.selectedIndex = this.tabs.findIndex((item) => {
            return (item.classList.contains("active"));
        });
    }

    attachEvents = () => {
        const me_ = this;

        this.tabs.forEach(function (item) {
            item.addEventListener('click', me_.clickEventListener);
            item.addEventListener('onChange', me_.onChange);
        });
    }

    static handleDataAPI = () => {
        handleDataBinding("tabs", function (element) {
            return new Tabs(element, {});
        })
    }
}

export default Tabs;