(function () {
    var Tabs = {
        selectors: {
            tabs: 'tabs-nav',
            tabPanel: 'tabs-panel',
            disabledTabPanel: 'tabs-disabled',
            selectedTabPanel: 'active',
            activeTab: 'active'
        },
        tablist: [],
        init: function () {
            let tabs = Array.from(document.querySelectorAll('nav[data-tabs]'));
            this.tablist = tabs;
            this.bindEventsForEachTab();
        },
        bindEventsForEachTab: function () {
            let me_ = this;
            this.tablist.forEach(function (item, index) {
                let tabs = Array.from(item.querySelectorAll('li[role=tab]'));
                for (let i = 0; i < tabs.length; i++) {
                    tabs[i].addEventListener('click', me_.clickEventListener);
                }
            });
        },
        clickEventListener: function (event) {
            const currentTarget = event.currentTarget;
            const target = event.target;
            const isLi = currentTarget === target; // Li
            let tabID, element, parentIdx;
            if (isLi) {
                element = currentTarget;
                tabID = currentTarget.getAttribute('aria-controls');
            } else {
                element = target.parentElement;
                tabID = target.parentElement.getAttribute('aria-controls');
            }

            if (!element.classList.contains(Tabs.selectors.disabledTabPanel)) {
                for (let j = 0; j < Tabs.tablist.length; j++) {
                    if (Tabs.tablist[j].contains(element)) {
                        parentIdx = j;
                        break;
                    }
                }
                Tabs.findTabs(tabID, parentIdx);
            }

        },
        findTabs: function (tabID, pIdx) {
            let me_ = this;
            let children = me_.tablist[pIdx].children, tabChildren;
            for (let u = 0; u < children.length; u++) { // All Tab Loop
                if (children[u].classList.contains(Tabs.selectors.tabs)) {
                    tabChildren = children[u].children;
                    break;
                }
            }
            me_.toggleTab(tabID, tabChildren);
            me_.toggleTabPanel(me_.tablist[pIdx].nextElementSibling.children);
            document.getElementById(`${tabID}`).classList.add(Tabs.selectors.activeTab);
        },
        toggleTab: function (tId, tchildren) {
            if (tchildren) {
                for (let p = 0; p < tchildren.length; p++) {
                    tchildren[p].classList.remove(Tabs.selectors.selectedTabPanel);
                    let href = tchildren[p].getAttribute('aria-controls');
                    if (href === tId) {
                        tchildren[p].classList.add(Tabs.selectors.selectedTabPanel);
                    }
                }
            }
        },
        toggleTabPanel: function (tabpanels) {
            if (tabpanels) {
                let len = tabpanels.length;
                for (let i = 0; i < len; i++) {
                    tabpanels[i].classList.remove('active');
                }
            }
        }
    };
    Tabs.init();

})();