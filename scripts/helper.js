// this is only for deonstation purpose of maodal landing page
// will not go in PROD 

let helperOverflowMenu = (function () {

    DOMStrings = {
       

    };

    classNames = {
      
    }

    showOverflowMenu = function(){
        document.getElementById(`hcl-overflow-menu-wrap-left`).classList.remove(`hcl-overflow-close`);
    };

    let setupEventListeners = function () {
        document.getElementById(`hcl-overflow-ellipsis-left`).addEventListener('click', showOverflowMenu);
    };

    return {
        setUpHeplerEvents: function () {
            setupEventListeners();
        }
    };

})();

helperOverflowMenu.setUpHeplerEvents();