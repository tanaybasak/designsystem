// This javascript function is for demonstation demonstration purpose of modal in landing page
// This function will not be part package created for design system

const modal = (function() {
  const DOMStrings = {
    modalContainer: 'hcl-modal-type',
    modalButton: 'hcl-btn-modal-type'
  };

  const classNames = {
    modalDisable: 'hcl-modal-hide'
  };

  const showModal = function(event) {
    const modalType = event.target.getAttribute('data-modal-type');
    document
      .getElementById(`${DOMStrings.modalContainer}${modalType}`)
      .classList.remove(classNames.modalDisable);
  };

  const hideModal = function(event) {
    const modalType = event.target
      .closest('section[data-modal-type]')
      .getAttribute('data-modal-type');
    document
      .getElementById(`${DOMStrings.modalContainer}${modalType}`)
      .classList.add(classNames.modalDisable);
  };

  const setupEventListeners = function() {
    for (let type = 1; type <= 8; type++) {
      let elm = document.getElementById(`hcl-btn-modal-type${type}`);
      if (elm) {
        elm.addEventListener('click', showModal);
      }
      elm = document.getElementById(`hcl-modal-close-type${type}`);
      if (elm) {
        elm.addEventListener('click', hideModal);
      }
      elm = document.getElementById(`hcl-modal-cancel-type${type}`);
      if (elm) {
        elm.addEventListener('click', hideModal);
      }
    }
  };

  return {
    setUpHeplerEvent: function() {
      setupEventListeners();
    }
  };
})();

modal.setUpHeplerEvent();
