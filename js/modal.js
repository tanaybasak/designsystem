// This javascript function is for demonstation demonstration purpose of modal in landing page
// This function will not be part package created for design system

const modal = (function() {
  const DOMStrings = {
    modalContainer: "hcl-modal-type",
    modalButton: "hcl-btn-modal-type"
  };

  const classNames = {
    modalDisable: "hcl-modal-hide"
  };

  showModal = function(event) {
    const modalType = event.target.getAttribute("data-modal-type");
    document
      .getElementById(`${DOMStrings.modalContainer}${modalType}`)
      .classList.remove(classNames.modalDisable);
  };

  hideModal = function(event) {
    const modalType = event.target
      .closest("section[data-modal-type]")
      .getAttribute("data-modal-type");
    document
      .getElementById(`${DOMStrings.modalContainer}${modalType}`)
      .classList.add(classNames.modalDisable);
  };

  const setupEventListeners = function() {
    for (let type = 1; type <= 8; type++) {
      let elm = document.getElementById(`hcl-btn-modal-type${type}`);
      elm ? elm.addEventListener("click", showModal) : null;
      elm = document.getElementById(`hcl-modal-close-type${type}`);
      elm ? elm.addEventListener("click", hideModal) : null;
      elm = document.getElementById(`hcl-modal-cancel-type${type}`);
      elm ? elm.addEventListener("click", hideModal) : null;
    }
  };

  return {
    setUpHeplerEvent: function() {
      setupEventListeners();
    }
  };
})();

modal.setUpHeplerEvent();
