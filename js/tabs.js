import { PREFIX } from "./utils/config";
import { NOOP } from "./utils/functions";
import handleDataBinding from "./utils/data-api";
import getClosest from "./utils/get-closest";

class Tabs {
    constructor(element, options) {
        this.element = element;
        this.tabs = Array.from(element.querySelectorAll("li"));
        this.tabpanels = Array.from(element.querySelectorAll(`.${PREFIX}-tabcontent div.${PREFIX}-tabs-panel`));
        this.state = {
            selectedIndex: 0,
            onChange: NOOP,
            selectedTabId: "",
            ...options
        };

        if (this.state.selectedTabId !== "") {
            this.toggleTab(this.state.selectedTabId);
            this.toggleTabPanel(this.state.selectedTabId)
        }
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
        if (this.element.contains(link)) {
            if (!link.parentElement.classList.contains(`${PREFIX}-tabs-disabled`)) {
                link.parentElement.classList.add('active');
                link.parentElement.setAttribute("aria-selected", true);
            }
        }
        this.changeState();
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

    attachEvents = (ele) => {
        const len = this.tabs.length;
        for (let i = 0; i < len; i++) {
            this.tabs[i].addEventListener('click', this.clickEventListener);
        }
    }

    static handleDataAPI = () => {
        handleDataBinding("tabs", function (element, target) {
            return new Tabs(element, { selectedTabId: getClosest(target, "li").getAttribute("data-target") });
        })
    }
}
export default Tabs;