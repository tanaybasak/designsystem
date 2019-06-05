(function () {
    var Tabs = {
        selectors: {
            tabs: 'hcl-tabs-nav',
            tabPanel: 'hcl-tabs-panel',
            disabledTabPanel: 'hcl-tabs-disabled',
            selectedTabPanel: 'active',
            activeTab: 'active'
        },
        tablist: [],
        init: function () {
            this.tablist = Array.from(document.querySelectorAll('nav[data-tabs]')) || [];
            this.bindEventsForEachTab();
        },
        bindEventsForEachTab: function () {
            this.tablist.forEach((item, parentIdx)=>{
                let tabs = Array.from(item.querySelectorAll('li[role=tab]'));
                for (let i = 0; i < tabs.length; i++) {
                    tabs[i].addEventListener('click', ()=>{
                        const currentTarget = event.currentTarget;
                        const target = event.target;
                        const isLi = currentTarget === target; 
                        this.clickEventListener({
                            currentTarget,
                            target,
                            isLi,
                            parentIdx
                        })
                    });
                }
            });
        },
        clickEventListener: function (params) {
            
            let {
                currentTarget,
                target,
                isLi,
                parentIdx
            } = params;

            if (isLi) {
                element = currentTarget;
                tabID = currentTarget.dataset.target;
            } else {
                element = target.parentElement;
                tabID = target.parentElement.dataset.target;
            }
            if (!element.classList.contains(Tabs.selectors.disabledTabPanel)) {
                Tabs.findTabs(tabID, parentIdx);            
            }
        },
        findTabs: function (tabID, pIdx) {
            let me_ = this;
            let children = me_.tablist[pIdx].children,
                tabChildren;
            for (let u = 0; u < children.length; u++) {
                // All Tab Loop
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
                    let href = tchildren[p].dataset.target;
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
