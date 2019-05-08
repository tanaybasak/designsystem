// this is helper event for modals

let helperModal = (function () {

    DOMString = {

    };

    className = {

    }

    showModal = function (event) {
        let type = event.target.getAttribute("data-modal-type");
        document.getElementById(`hcl-modal-type${type}`).classList.remove('hcl-modal-disable');
    };

    hideModal = function (event) {
        let type = event.target.closest("div[data-modal-type]").getAttribute("data-modal-type");
        document.getElementById(`hcl-modal-type${type}`).classList.add('hcl-modal-disable');
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