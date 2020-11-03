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
      selectorAnchor: `a.${PREFIX}-tabs-nav-link`,
      tabContent: `.${PREFIX}-tabcontent`,
      tabPanel: `.${PREFIX}-tabcontent > div.${PREFIX}-tabs-panel`
    };

    this.state = {
      selectedIndex: 0,
      onChange: NOOP,
      selectedTabId: '',
      disabled: [],
      ...options
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

  keydownListener = e => {
    const keycode = e.keycode || e.which;

    if (keycode === 37) {
      // previous
      e.preventDefault();
      this.focusNode(e.target, 'previous');
    } else if (e.keyCode === 39) {
      // next
      e.preventDefault();
      this.focusNode(e.target, 'next');
    }

    if (e.keyCode === 13 || e.keyCode === 32) {
      // space or Enter
      e.preventDefault();
      e.target.click();
    }
  };

  focusNode(node, direction = 'next') {
    if (direction === 'next') {
      if (!node.nextElementSibling) {
        // last
        if (
          node.parentElement.firstElementChild.classList.contains(
            `${PREFIX}-tabs-disabled`
          )
        ) {
          this.focusNode(node.parentElement.firstElementChild);
        } else {
          node.parentElement.firstElementChild.focus();
        }
      } else if (
        node.nextElementSibling &&
        node.nextElementSibling.classList.contains(`${PREFIX}-tabs-disabled`)
      ) {
        // disabled
        this.focusNode(node.nextElementSibling);
      } else {
        // focus next respective element.
        if (node.nextElementSibling) {
          node.nextElementSibling.focus();
          return false;
        }
      }
    } else if (direction === 'previous') {
      if (!node.previousElementSibling) {
        // first
        if (
          node.parentElement.lastElementChild.classList.contains(
            `${PREFIX}-tabs-disabled`
          )
        ) {
          this.focusNode(node.parentElement.lastElementChild, 'previous');
        } else {
          node.parentElement.lastElementChild.focus();
        }
      } else if (
        node.previousElementSibling &&
        node.previousElementSibling.classList.contains(
          `${PREFIX}-tabs-disabled`
        )
      ) {
        // disabled
        this.focusNode(node.previousElementSibling, 'previous');
      } else {
        // focus next respective element.
        if (node.previousElementSibling) {
          node.previousElementSibling.focus();
          return false;
        }
      }
    }
  }

  toggleTab = target => {
    Array.from(
      this.element.querySelectorAll(this.selectors.selectableTabsAll)
    ).forEach(item => {
      if (item) {
        item.classList.remove('active');
        item.setAttribute('aria-selected', false);
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
    // const anchorEle = Array.from(
    //   this.element.querySelectorAll(this.selectors.selectorAnchor)
    // );
    const len = tabs.length;
    // const anchorLen = anchorEle.length;
    for (let i = 0; i < len; i++) {
      tabs[i].addEventListener('click', this.clickEventListener.bind(this));
      tabs[i].addEventListener('keydown', this.keydownListener.bind(this));
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
