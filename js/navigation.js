/******************************************************************
 * HCL Confidential
 *
 * Copyright HCL Technologies Ltd. 2019 All rights reserved.
 *
 *******************************************************************
 */

const ELEMENTS = {
    navbar: '[class*="hcl-navbar"]',
    navToolbar: '[class*="hcl-navbar-nav toolbar"]',
    search: '[class*="hcl-navbar-search"]',
    searchInput: '[class*="hcl-navbar-search-input"]',
    searchBtn: '[class*="hcl-navbar-search-btn"]',
    searchBtnSmall: '[class*="hcl-navbar-search-btn hcl-navbar-expand"]',
    searchBtnClose: '[class*="hcl-navbar-search-close"]',
    hamburger: 'button[class*="hcl-navbar-hamburger"]',
    chevron: 'button[class*="hcl-icon"]',
    sidebar: '[class*="hcl-sidebar"]',
    sidebarTitle: '[class*="hcl-sidebar-title"]',
    sidebarList: '[class*="hcl-sidebar-list"]',
    sidebarShow: '[class*="show-sidebar"]',
    content: '[class*="hcl-content"]',
    contentMain: '[class*="hcl-content-main"]'
};

const CSS_MODIFIERS = {
    sidebarDesktop: 'expanded-sidebar',
    sidebarSmall: 'show-sidebar',
    overlay: 'hcl-overlay',
    mt_3: 'mt-3',
    show: 'shown'
};

class Navigation {
    init() {
        // CLOSE ON OUTER AREA EVENTS; SCREEN = 768px
        document.addEventListener('click', this.documentEventHandler.bind(this));
        // SHOW SIDEBAR ON HAMBURGER EVENTS; SCREEN = 768px
        this.getElementByQuery(ELEMENTS.hamburger).addEventListener('click', this.hamburgerEventHandler.bind(this));
        // SHOW/HIDE SIDEBAR ON CHEVRON EVENTS; DESKTOP
        this.getElementByQuery(ELEMENTS.chevron).addEventListener('click', this.chevronEventHandler.bind(this));
        // SHOW SEARCH ON BUTTON EVENTS; SCREEN = 768px
        this.getElementByQuery(ELEMENTS.searchBtnSmall).addEventListener('click', this.searchBtnSmallEventHandler.bind(this));
        // HIDE SEARCH ON CLOSE EVENTS; SCREEN = 768px
        this.getElementByQuery(ELEMENTS.searchBtnClose).addEventListener('click', this.searchCloseEventHandler.bind(this));
        // SHOW SEARCH ON BUTTON EVENTS; DESKTOP
        this.getElementByQuery(ELEMENTS.searchBtn).addEventListener('click', this.searchBtnDesktopEventHandler.bind(this));
    }

    documentEventHandler(e) {
        const navToolbarElm = this.getElementByQuery(ELEMENTS.navToolbar);
        const hamburgerElm = this.getElementByQuery(ELEMENTS.hamburger);
        const sidebarElms = Array.from(document.querySelectorAll(ELEMENTS.sidebarShow));
        if (sidebarElms && sidebarElms.length && !(hamburgerElm.dataset.hasOwnProperty('hamburgerOpen') && /^(true|"true")/i.test(hamburgerElm.dataset.hamburgerOpen))) {
            navToolbarElm.classList.remove(CSS_MODIFIERS.sidebarSmall);
            sidebarElms.forEach(elm => {
                elm.classList.remove(CSS_MODIFIERS.sidebarSmall);
            });
        } else {
            if (hamburgerElm.dataset.hasOwnProperty('hamburgerOpen')) {
                hamburgerElm.dataset.hamburgerOpen = false;
            }
        }
    }

    hamburgerEventHandler(e) {
        const hamburgerElm = this.getElementByQuery(ELEMENTS.hamburger);
        const searchFormElm = this.getElementByQuery(ELEMENTS.search);
        const sidebarElm = this.getElementByQuery(ELEMENTS.sidebar);
        const sidebarListElm = this.getElementByQuery(ELEMENTS.sidebarList);
        const navToolbarElm = this.getElementByQuery(ELEMENTS.navToolbar);
        const contentElm = this.getElementByQuery(ELEMENTS.content);
        if (!sidebarElm.classList.contains(CSS_MODIFIERS.sidebarSmall)) {
            hamburgerElm.setAttribute('data-hamburger-open', true);
            sidebarElm.classList.add(CSS_MODIFIERS.sidebarSmall);
            sidebarListElm.classList.add(CSS_MODIFIERS.sidebarSmall);
            navToolbarElm.classList.add(CSS_MODIFIERS.sidebarSmall);
            searchFormElm.classList.remove(CSS_MODIFIERS.show);
            contentElm.classList.remove(CSS_MODIFIERS.mt_3);
        } else {
            sidebarElm.classList.remove(CSS_MODIFIERS.sidebarSmall);
            sidebarListElm.classList.remove(CSS_MODIFIERS.sidebarSmall);
            navToolbarElm.classList.remove(CSS_MODIFIERS.sidebarSmall);
        }
    }

    chevronEventHandler(e) {
        const sidebarElm = this.getElementByQuery(ELEMENTS.sidebar);
        const sidebarTitleElm = this.getElementByQuery(ELEMENTS.sidebarTitle);
        const sidebarListElm = this.getElementByQuery(ELEMENTS.sidebarList);
        if (!sidebarElm.classList.contains(CSS_MODIFIERS.sidebarDesktop)) {
            sidebarElm.classList.add(CSS_MODIFIERS.sidebarDesktop);
            sidebarTitleElm.classList.add(CSS_MODIFIERS.sidebarDesktop);
            sidebarListElm.classList.add(CSS_MODIFIERS.sidebarDesktop);
        } else {
            sidebarElm.classList.remove(CSS_MODIFIERS.sidebarDesktop);
            sidebarTitleElm.classList.remove(CSS_MODIFIERS.sidebarDesktop);
            sidebarListElm.classList.remove(CSS_MODIFIERS.sidebarDesktop);
        }
    }

    searchBtnSmallEventHandler(e) {
        const searchFormElm = this.getElementByQuery(ELEMENTS.search);
        if (!searchFormElm.classList.contains(CSS_MODIFIERS.show)) {
            searchFormElm.classList.add(CSS_MODIFIERS.show);
            this.getElementByQuery(ELEMENTS.content).classList.add(CSS_MODIFIERS.mt_3);
        } else {
            searchFormElm.classList.remove(CSS_MODIFIERS.show);
            this.getElementByQuery(ELEMENTS.content).classList.remove(CSS_MODIFIERS.mt_3);
        }
    }

    searchCloseEventHandler(e) {
        this.getElementByQuery(ELEMENTS.content).classList.remove(CSS_MODIFIERS.mt_3);
        this.getElementByQuery(ELEMENTS.search).classList.remove(CSS_MODIFIERS.show);
        this.getElementByQuery(ELEMENTS.searchInput).classList.remove(CSS_MODIFIERS.show);
        this.getElementByQuery(ELEMENTS.searchBtn).classList.remove(CSS_MODIFIERS.show);
        this.getElementByQuery(ELEMENTS.searchBtnClose).classList.remove(CSS_MODIFIERS.show);
    }

    searchBtnDesktopEventHandler(e) {
        const currentTarget = e.currentTarget;
        const searchFormElm = this.getElementByQuery(ELEMENTS.search);
        const searchInputElm = this.getElementByQuery(ELEMENTS.searchInput);
        const searchBtnCloseElm = this.getElementByQuery(ELEMENTS.searchBtnClose);
        if (!searchInputElm.classList.contains(CSS_MODIFIERS.show)) {
            searchFormElm.classList.add(CSS_MODIFIERS.show);
            searchInputElm.classList.add(CSS_MODIFIERS.show);
            searchBtnCloseElm.classList.add(CSS_MODIFIERS.show);
            currentTarget.classList.add(CSS_MODIFIERS.show);
        } else {
            searchFormElm.classList.remove(CSS_MODIFIERS.show);
            searchInputElm.classList.remove(CSS_MODIFIERS.show);
            searchBtnCloseElm.classList.remove(CSS_MODIFIERS.show);
            currentTarget.classList.remove(CSS_MODIFIERS.show);
        }
    }

    getElementByQuery(selector) {
        return document.querySelector(selector);
    }
}

(function () {
    const navigation = new Navigation();
    navigation.init();
})();