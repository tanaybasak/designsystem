const overflowMenu = (function () {

    const DOMStrings = {
        leftOveflowEllipsis: 'hcl-ellipsis-overflow-left',
    };

    const classNames = {
        showOverflowMenu: 'hcl-overflow-menu-show',
    };

    toggleOverflowMenu = function (event) {
        const modalType = event.target.closest("section[data-modal-type]").getAttribute("data-modal-type");
        document.getElementById(`${DOMStrings.modalContainer}${modalType}`).classList.add(classNames.modalDisable);
    };

    const setupEventListeners = function () {

        let elm = document.getElementById(`hcl-ellipsis-overflow-left`);
        elm ? elm.addEventListener('click', toggleOverflowMenu) : null;

        let elm = document.getElementById(`hcl-ellipsis-overflow-right`);
        elm ? elm.addEventListener('click', toggleOverflowMenu) : null;

    };

    return {
        setUpHeplerEvent: function () {
            setupEventListeners();
        }
    };

})();

overflowMenu.setUpHeplerEvent();