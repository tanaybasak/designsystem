import { PREFIX } from './utils/config';
import { NOOP } from './utils/functions';
import handleDataBinding from './utils/data-api';
import getClosest from './utils/get-closest';

class Tabs {
    constructor(element, options) {
        this.element = element;
        this.selectors = {
            tabItem: `li`,
            selectableTabs: `li.${PREFIX}-tabs-nav-item:not(.${PREFIX}-tabs-disabled)`,
            selectableTabsAll: `li.${PREFIX}-tabs-nav-item`,
            tabContent: `.${PREFIX}-tabcontent`,
            tabPanel: `.${PREFIX}-tabcontent > div.${PREFIX}-tabs-panel`,
            tabs: Array.from(element.querySelectorAll(`li.${PREFIX}-tabs-nav-item`))
        };
        this.state = {
            selectedIndex: 0,
            onChange: NOOP,
            selectedTabId: '',
            disabled: [],
            ...options
        };

        this.direction = {
            37: -1,
            39: 1,
        };

        if (this.state.selectedIndex > -1) {
            this.toggleTab(this.state.selectedIndex);
            this.toggleTabPanel(this.state.selectedIndex);
        }
    }

    clickEventListener = e => {
        e.preventDefault();
        const { currentTarget, target } = e;
        const isLi = currentTarget === target;
        let tabItem = null;
        if (isLi) {
            tabItem = currentTarget;
        } else {
            tabItem = target.parentElement;
        }

        if (tabItem && tabItem.classList.contains(`${PREFIX}-tabs-disabled`)) {
            return false;
        }

        const tabId = Array.from(
            this.element.querySelectorAll(this.selectors.selectableTabsAll)
        ).findIndex(item => {
            return item.isEqualNode(tabItem);
        });

        if (tabId > -1 && !tabItem.classList.contains(`${PREFIX}-tabs-disabled`)) {
            this.toggleTab(tabId);
            this.toggleTabPanel(tabId);
        }
    };

    keydownEventListener = e => {
        const key = e.keyCode;
        if (key === 37 || key === 39) {
            const targetIndex = this.selectors.tabs.indexOf(e.target.parentElement);
            const destTargetEle = this.selectors.tabs[targetIndex + this.direction[key]];
            if (destTargetEle && !this.isDisabled(destTargetEle)) {
                this.toggleTab(targetIndex + this.direction[key]);
                this.toggleTabPanel(targetIndex + this.direction[key]);
            } else {
                let ele;
                if (this.selectors.tabs.indexOf(this.selectors.tabs[targetIndex]) === 0) { // first element
                    ele = this.selectors.tabs[this.selectors.tabs.length - 1];
                } else if (this.selectors.tabs.indexOf(this.selectors.tabs[targetIndex]) === (this.selectors.tabs.length - 1)) { // last element
                    ele = this.selectors.tabs[0];
                } else {
                    ele = destTargetEle;
                }

                const toggleEle = this.findElementToFocus(ele, this.direction[key]);
                if (toggleEle) {
                    const idx = this.selectors.tabs.indexOf(toggleEle);
                    this.toggleTab(idx);
                    this.toggleTabPanel(idx);
                }
            }
        }
    }

    findElementToFocus = (ele, direction) => {
        if (ele && !ele.classList.contains(`${PREFIX}-tabs-disabled`)) { // not disabled
            return ele;
        }
        else {
            if (this.selectors.tabs.indexOf(ele) === 0) { // first element
                if (direction === -1) {
                    ele = this.selectors.tabs[this.selectors.tabs.length - 1];
                } else {
                    ele = ele.nextElementSibling;
                }
            } else if (this.selectors.tabs.indexOf(ele) === (this.selectors.tabs.length - 1)) { // last element
                if (direction === -1) {
                    ele = ele.previousElementSibling;
                } else {
                    ele = this.selectors.tabs[0];
                }
            }
            return this.findElementToFocus(ele, direction);
        }
    }

    isDisabled = (ele) => {
        if (ele.classList.contains(`${PREFIX}-tabs-disabled`)) {
            return true;
        } else {
            return false;
        }
    }

    toggleTab = target => {
        Array.from(
            this.element.querySelectorAll(this.selectors.selectableTabsAll)
        ).forEach(item => {
            if (item) {
                item.classList.remove('active');
                item.setAttribute('aria-selected', false);
                item.setAttribute('tabindex', '-1');
            }
        });
        this.selectTab(target);
    };

    selectTab = target => {
        const tabItem = Array.from(
            this.element.querySelectorAll(this.selectors.selectableTabsAll)
        ).find((item, index) => {
            return target === index;
        });

        if (this.element.contains(tabItem)) {
            tabItem.classList.add('active');
            tabItem.setAttribute('aria-selected', true);
            tabItem.removeAttribute('tabindex');
            tabItem.querySelector('a').focus();
        }

        if (this.state.disabled && this.state.disabled.length > 0) {
            Array.from(
                this.element.querySelectorAll(this.selectors.selectableTabsAll)
            ).forEach((item, index) => {
                if (this.state.disabled.indexOf(index) > -1) {
                    item.classList.add(`${PREFIX}-tabs-disabled`);
                }
            });
        }
        this.changeState();
    };

    toggleTabPanel = tabId => {
        Array.from(this.element.querySelectorAll(this.selectors.tabPanel)).forEach(
            item => {
                if (item) {
                    item.classList.remove('active');
                }
            }
        );
        this.selectTabPanel(tabId);
    };

    selectTabPanel = tabId => {
        const tabPanel = Array.from(
            this.element.querySelectorAll(this.selectors.tabPanel)
        ).find((item, index) => {
            return tabId === index;
        });

        if (tabPanel) {
            tabPanel.classList.add('active');
        }
    };

    changeState = () => {
        this.state.selectedIndex = Array.from(
            this.element.querySelectorAll(this.selectors.selectableTabsAll)
        ).findIndex(item => {
            return item.classList.contains('active');
        });
    };

    attachEvents = () => {
        const tabs = Array.from(
            this.element.querySelectorAll(this.selectors.selectableTabsAll)
        );
        const len = tabs.length;
        for (let i = 0; i < len; i++) {
            tabs[i].addEventListener('click', this.clickEventListener.bind(this));
            tabs[i].addEventListener('keydown', this.keydownEventListener.bind(this));
        }
    };

    static handleDataAPI = () => {
        handleDataBinding('tabs', function (element, target) {
            const defaultTabOption = { selectedIndex: 0, disabled: [] };
            if (element && target) {
                const tabItems = Array.from(
                    element.querySelectorAll(`li.${PREFIX}-tabs-nav-item`)
                );
                if (!getClosest(target, `li.${PREFIX}-tabs-nav-item`)) {
                    const tabPanel = getClosest(target, `.${PREFIX}-tabs-panel`);
                    defaultTabOption.selectedIndex = Array.from(
                        element.querySelectorAll(`div.${PREFIX}-tabs-panel`)
                    ).findIndex(item => {
                        return item.isEqualNode(tabPanel);
                    });
                } else {
                    target = getClosest(target, `li.${PREFIX}-tabs-nav-item`);
                    defaultTabOption.selectedIndex = tabItems.findIndex(item => {
                        return item.isEqualNode(target);
                    });
                }
                const len = tabItems.length || 0;
                for (let i = 0; i < len; i++) {
                    if (tabItems[i].classList.contains(`${PREFIX}-tabs-disabled`)) {
                        defaultTabOption.disabled.push(i);
                    }
                }
            }
            return new Tabs(element, {
                selectedIndex: 0,
                disabled: [],
                ...defaultTabOption
            });
        });
    };
}
export default Tabs;
