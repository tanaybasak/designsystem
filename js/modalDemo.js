// This javascript function is for demonstation demonstration purpose of modal in landing page
// This function will not be part package created for design system

const modal = (function() {
  let focusTrap = true;
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
      event.target.nextElementSibling.focus();
  };

  const hideModal = function(event) {
    const modalType = event.target
      .closest('section[data-modal-type]')
      .getAttribute('data-modal-type');
    document
      .getElementById(`${DOMStrings.modalContainer}${modalType}`)
      .classList.add(classNames.modalDisable);
  };

  keyListener = event => {
    event.preventDefault();
    if (event.keyCode == 27){
      hideModal(event);
    }
  }

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
      elm = document.getElementById(`hcl-modal-type${type}`);
      if (elm) {
        elm.addEventListener('keydown', this.keyListener.bind(this));
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
