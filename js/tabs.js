import { PREFIX } from "./utils/config";
import { NOOP } from "./utils/functions";
import handleDataBinding from "./utils/data-api";
import getClosest from "./utils/get-closest";

class Tabs {
    constructor(element, options) {
        this.element = element;
        this.selectors = {
            tabItem: `li`,
            selectableTabs: `li.${PREFIX}-tabs-nav-item:not(.${PREFIX}-tabs-disabled)`,
            selectableTabsAll: `li.${PREFIX}-tabs-nav-item`,
            tabContent: `.${PREFIX}-tabcontent`,
            tabPanel: `.${PREFIX}-tabcontent > div.${PREFIX}-tabs-panel`
        }

        this.state = {
            selectedIndex: 0,
            onChange: NOOP,
            selectedTabId: "",
            ...options
        };

        if (this.state.selectedIndex > -1) {
            this.toggleTab(this.state.selectedIndex);
            this.toggleTabPanel(this.state.selectedIndex)
        }
    }

    clickEventListener = (e) => {
        e.preventDefault();
        const { currentTarget, target } = e;
        const isLi = currentTarget === target;
        let tabId, tabItem;
        if (isLi) {
            tabItem = currentTarget;
        }
        else {
            tabItem = target.parentElement;
        }

        if (tabItem && tabItem.classList.contains(`${PREFIX}-tabs-disabled`)) {
            return false;
        }

        tabId = Array.from(this.element.querySelectorAll(this.selectors.selectableTabsAll)).findIndex((item) => {
            return item.isEqualNode(tabItem);
        });

        if (tabId > -1 && !tabItem.classList.contains(`${PREFIX}-tabs-disabled`)) {
            this.toggleTab(tabId);
            this.toggleTabPanel(tabId);
        }
    }

    toggleTab = (target) => {
        Array.from(this.element.querySelectorAll(this.selectors.selectableTabsAll)).forEach((item) => {
            if (item) {
                item.classList.remove("active");
                item.setAttribute("aria-selected", false);
            }
        });
        this.selectTab(target);
    }

    selectTab = (target) => {
        const tabItem = Array.from(this.element.querySelectorAll(this.selectors.selectableTabsAll)).find((item, index) => {
            return target === index;
        });

        if (this.element.contains(tabItem)) {
            if (!tabItem.classList.contains(`${PREFIX}-tabs-disabled`)) {
                tabItem.classList.add('active');
                tabItem.setAttribute("aria-selected", true);
            }
        }
        this.changeState();
    }

    toggleTabPanel = (tabId) => {
        Array.from(this.element.querySelectorAll(this.selectors.tabPanel)).forEach((item) => {
            if (item) {
                item.classList.remove("active");
            }
        });
        this.selectTabPanel(tabId);
    }

    selectTabPanel = (tabId) => {
        const tabPanel = Array.from(this.element.querySelectorAll(this.selectors.tabPanel)).find((item, index) => {
            return tabId === index;
        });

        if (tabPanel) {
            tabPanel.classList.add("active");
        }
    }

    changeState = () => {
        this.state.selectedIndex = Array.from(this.element.querySelectorAll(this.selectors.selectableTabsAll)).findIndex((item) => {
            return (item.classList.contains("active"));
        });
    }

    attachEvents = () => {
        const tabs = Array.from(this.element.querySelectorAll(this.selectors.selectableTabsAll));
        const len = tabs.length;
        for (let i = 0; i < len; i++) {
            tabs[i].addEventListener('click', this.clickEventListener.bind(this));
        }
    }

    static handleDataAPI = () => {
        handleDataBinding("tabs", function (element, target) {
            let idx = 0;
            if (element && target) {
                target = getClosest(target, `li.${PREFIX}-tabs-nav-item`);
                if (target.classList.contains(`${PREFIX}-tabs-disabled`)) {
                    return false;
                }
                idx = Array.from(element.querySelectorAll(`li.${PREFIX}-tabs-nav-item`)).findIndex((item) => {
                    return item.isEqualNode(target);
                });
            }
            return new Tabs(element, {
                selectedIndex: idx || 0
            });
        })
    }
}
export default Tabs;