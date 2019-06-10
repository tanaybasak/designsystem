import { PREFIX } from "./utils/config";
import { NOOP } from "./utils/functions";
import handleDataBinding from "./utils/data-api";

class ContentSwitcher {
    constructor(element, options) {
        this.element = element;

        this.selectors = {
            contentswitcher: `.${PREFIX}-content-switcher`,
            contentswitcherBtn: `.${PREFIX}-content-switcher-btn:disabled`,
            contentswitcherPanel: `.${PREFIX}-content-switcher-content > div`,
        }

        this.state = {
            selectedIndex: 0,
            onChange: NOOP,
            selectedSwitchId: "",
            ...options
        };

        if (this.state.selectedIndex > -1) {
            this.toggleSwitch(this.state.selectedIndex);
            this.toggleSwitchPanel(this.state.selectedIndex)
        }
    }

    toggleSwitch = (target) => {
        Array.from(this.element.querySelectorAll(this.selectors.contentswitcherBtn)).forEach((item) => {
            if (item) {
                item.classList.remove("active");
                item.setAttribute("aria-selected", false);
            }
        });
        this.selectSwitch(target);
    }

    selectSwitch = (target) => {
        const switchItem = Array.from(this.element.querySelectorAll(this.selectors.contentswitcherBtn)).find((item, index) => {
            return target === index;
        });

        if (this.element.contains(switchItem)) {
            if (!switchItem.classList.contains(`${PREFIX}-tabs-disabled`)) {
                switchItem.classList.add('active');
                switchItem.setAttribute("aria-selected", true);
            }
        }
        this.changeState();
    }

    changeState = () => {
        this.state.selectedIndex = Array.from(this.element.querySelectorAll(this.selectors.contentswitcherBtn)).findIndex((item) => {
            return (item.classList.contains("active"));
        });
    }

    toggleSwitchPanel = (switchId) => {
        Array.from(this.element.querySelectorAll(this.selectors.contentswitcherPanel)).forEach((item) => {
            if (item) {
                item.classList.remove("active");
            }
        });
        this.selectTabPanel(switchId);
    }

    static handleDataAPI = () => {
        handleDataBinding("tabs", function (element, target) {
            let idx = 0;
            if (element && target) {
                idx = Array.from(element.querySelectorAll(this.selectors.contentswitcherBtn)).findIndex((item) => {
                    return item.isEqualNode(target);
                });
            }
            return new Tabs(element, {
                selectedIndex: idx || 0
            });
        });
    }
}
export default ContentSwitcher;