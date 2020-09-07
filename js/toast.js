// This javascript function is for demonstation demonstration purpose of toast in landing page
// This function will not be part package created for design system

const toast = (function () {
  const DOMStrings = {
    toastContainer: 'hcl-toast-type',
    toastButton: 'hcl-btn-toast-type'
  };

  const classNames = {
    toastDisable: 'hcl-toast-hide'
  };

  const showtoast = function (event) {
    const toastType = event.target.getAttribute('data-toast-type');
    document
      .getElementById(`${DOMStrings.toastContainer}${toastType}`)
      .classList.remove(classNames.toastDisable);
  };

  const hidetoast = function (event) {
    const toastType = event.target
      .closest('div[data-toast-type]')
      .getAttribute('data-toast-type');
    document
      .getElementById(`${DOMStrings.toastContainer}${toastType}`)
      .classList.add(classNames.toastDisable);
  };

  const setupEventListeners = function () {
    for (let type = 1; type <= 4; type++) {
      let elm = document.getElementById(`hcl-btn-toast-type${type}`);
      if (elm) {
        elm.addEventListener('click', showtoast);
      }
      elm = document.getElementById(`hcl-toast-close${type}`);
      if (elm) {
        elm.addEventListener('click', hidetoast);
      }
    }
  };

  return {
    setUpHeplerEvent: function () {
      setupEventListeners();
    }
  };
})();

toast.setUpHeplerEvent();
