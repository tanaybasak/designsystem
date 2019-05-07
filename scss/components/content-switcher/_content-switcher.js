(function() {
 var contentSwitcher = {
    init: function() {
        let contentSwitcher = Array.from(document.querySelectorAll('div[data-content-switcher]'));
        this.switchers = contentSwitcher;
        this.bindEvents();
    },
    bindEvents: function() {
        let me_ = this;
        this.switchers.forEach(function (item, index) {
            let switchers = Array.from(item.querySelectorAll('button.hcl-content-switcher-btn'));
            for (let i = 0; i < switchers.length; i++) {
                switchers[i].addEventListener('click', me_.clickEventListener);
            }
        });
    },
    clickEventListener: function(ev) {
        const currentTarget = ev.currentTarget;
        const target = ev.target;
        const isBtn = currentTarget === target; // Li
        let btn, element, parentIdx;
        if (isBtn) {
            element = currentTarget;
            btn = currentTarget.getAttribute('aria-controls');
        } else {
            element = target.parentElement;
            btn = target.parentElement.getAttribute('aria-controls');
        }
    }
 };
 contentSwitcher.init();
})();