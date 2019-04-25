(function(){
 var Tabs = {
    tablist:[],
    init: function() {
        let tabs = document.querySelectorAll('nav[data-tabs]');
        this.tablist.push(tabs);
        this.bindEventsForEachTab();
    },
    bindEventsForEachTab: function() {
        this.tablist.forEach( function(item, index) {
            const tabsNav = item[0].children;
            tabsNav[0].addEventListener('click', this.clickEventListener);
        });
    },
    clickEventListener: function(event) {
            const target = event.target;
            const currentTarget = event.currentTarget;
            console.log(currentTarget);
            const isNav = /tabs-nav/gi.test(target.className); // If li is clicked
            //console.log(isNav);
            const nearLI = target.closest('.tabs-nav-item');
            var grandParent = target.closest('.tabs');
            //console.log(nearLI);
    }
 };
 Tabs.init();
 
})();