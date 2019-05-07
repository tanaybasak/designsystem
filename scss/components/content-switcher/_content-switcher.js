(function () {
    var contentSwitcher = {
        selectors: {
            contentswitcher: 'hcl-content-switcher',
            contentswitcherBtn: 'hcl-content-switcher-btn',
            activeTab: 'active'
        },
        switchers: [],
        init: function () {
            let contentSwitcher = Array.from(document.querySelectorAll('div[data-content-switcher]'));
            this.switchers = contentSwitcher;
            this.bindEvents();
        },
        bindEvents: function () {
            let me_ = this;
            this.switchers.forEach(function (item, index) {
                let switchers = Array.from(item.querySelectorAll('button.hcl-content-switcher-btn'));
                for (let i = 0; i < switchers.length; i++) {
                    switchers[i].addEventListener('click', me_.clickEventListener);
                }
            });
        },
        clickEventListener: function (ev) {
            const currentTarget = ev.currentTarget;
            const target = ev.target;
            const isBtn = currentTarget === target; // btn
            let btn, element, parentIdx;
            if (isBtn) {
                element = currentTarget;
                btn = currentTarget.getAttribute('data-target');
            } else {
                element = target.parentElement;
                btn = target.parentElement.getAttribute('data-target');
            }

            contentSwitcher.hideAllSwitcherPanels(element);
        },
        hideAllSwitcherPanels: function (element) {
            const buttons = Array.from(element.parentElement.querySelectorAll('button'));
            buttons.forEach(function (elem, idx) {
                elem.classList.remove('active');
                let panel = document.querySelector(elem.getAttribute('data-target'));
                panel.setAttribute('hidden', '');
                panel.setAttribute('aria-hidden', 'true');
            });
            element.classList.add('active');
            let panel = document.querySelector(element.getAttribute('data-target'));
            panel.removeAttribute('hidden');
            panel.setAttribute('aria-hidden', false);
        }
    };
    contentSwitcher.init();
})();