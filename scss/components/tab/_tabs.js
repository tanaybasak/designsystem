(function () {
    var Tabs = {
        selectors: {
            tabs:'tabs-nav',
            tabPanel:'tabs-panel',
            disabledTabs: 'tabs-nav-item--disabled',
            selectedTabs: 'tabs-nav-item--selected',
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

            if (!element.classList.contains(Tabs.selectors.disabledTabs)) {
                for (let j = 0; j < Tabs.tablist.length; j++) {
                    if (Tabs.tablist[j].contains(element)) {
                        parentIdx = j;
                        break;
                    }
                }
                Tabs.hideAllTabs(tabID, parentIdx);
            }

        },
        hideAllTabs: function (tabID, pIdx) {
            let me_ = this;
            let children = me_.tablist[pIdx].children, tabChildren;
            for (let u = 0; u < children.length; u++) {
                if (children[u].classList.contains(Tabs.selectors.tabPanel)) {
                    children[u].classList.remove(Tabs.selectors.activeTab);
                }
                if (children[u].classList.contains(Tabs.selectors.tabs)) {
                    tabChildren = children[u].children;
                }
            }
            me_.changeTab(tabID, tabChildren);
            me_.selectTabArea(tabID);
        },
        changeTab: function (tId, tchildren) {
            for (let p = 0; p < tchildren.length; p++) {
                tchildren[p].classList.remove(Tabs.selectors.selectedTabs);
                let href = tchildren[p].firstElementChild.getAttribute('href');
                if (href.slice(1) === tId) {
                    tchildren[p].classList.add(Tabs.selectors.selectedTabs);
                }
            }
        },
        selectTabArea: function (tId) {
            document.getElementById(`${tId}`).classList.add(Tabs.selectors.activeTab);
        }
    };
    Tabs.init();

})();