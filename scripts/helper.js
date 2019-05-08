// this is only for deonstation purpose of maodal landing page
// will not go in PROD 

let helperModal = (function () {

    DOMStrings = {
        modalContainer: 'hcl-modal-type',
        modalButton: 'hcl-btn-modal-type'

    };

    classNames = {
       modalDisable: 'hcl-modal-disable',
    }

    showModal = function (event) {
        let type = event.target.getAttribute("data-modal-type");
        document.getElementById(`${DOMStrings.modalContainer}${type}`).classList.remove(classNames.modalDisable);
    };

    hideModal = function (event) {
        let type = event.target.closest("div[data-modal-type]").getAttribute("data-modal-type");
        document.getElementById(`${DOMStrings.modalContainer}${type}`).classList.add(classNames.modalDisable);
    };

    let setupEventListeners = function () {
        for (let type = 1; type <= 8; type++) {
            document.getElementById(`hcl-btn-modal-type${type}`).addEventListener('click', showModal);
            document.getElementById(`hcl-modal-close-type${type}`).addEventListener('click', hideModal);
            document.getElementById(`hcl-modal-cancel-type${type}`).addEventListener('click', hideModal);
        };

    };

    return {
        setUpHeplerEvent: function () {
            setupEventListeners();
        }
    };

})();

helperModal.setUpHeplerEvent();