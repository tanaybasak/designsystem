import handleDataBinding from './utils/data-api';
class Modal {
  constructor(element,options) {
    this.element = element;
   
    this.state = {
        isOpen: false,
        ...options
      };       
  }

  focusTrap = (e) => {
        let modal = document.getElementById(this.element.getAttribute('data-target').slice(1));
        let focusableEls = modal.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])');
        let firstFocusableEl = focusableEls[0];  
        let lastFocusableEl = focusableEls[focusableEls.length - 1];
        
        if (event.keyCode == 27){
            event.preventDefault();
            this.hideModal(modal);
        }
    
        let isTabPressed = (e.key === 'Tab' || e.keyCode === "9");

        if (!isTabPressed) { 
            return; 
        }

        if ( e.shiftKey ){
            if (document.activeElement === firstFocusableEl) {
                lastFocusableEl.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === lastFocusableEl) {
                firstFocusableEl.focus();
                e.preventDefault();
            }
        }
    };

  showModal = (modal) => { 
    if(modal ==null)return
    modal.classList.remove('hcl-modal-hide');
    modal.focus();
  };

  hideModal = (modal) => {
    if(modal ==null)return
    modal.classList.add('hcl-modal-hide');
  };

  attachEvents = () => {
    let modal = document.getElementById(this.element.getAttribute('data-target').slice(1));
    const closeModalBtn = modal.querySelectorAll('[data-dismiss-btn]');

    if(this.state.isOpen){
        //this.state.isOpen = !this.state.isOpen;
        this.showModal(modal);
    }

    modal.addEventListener('keydown', this.focusTrap);

    this.element.addEventListener('click', () => {
        this.showModal(modal);  
    })  
    
    closeModalBtn.forEach(button => {
        button.addEventListener('click', () => {
           let modal = button.closest('.hcl-modal');
           this.hideModal(modal);    
        })      
     });
  };

  static handleDataAPI = () => {
    handleDataBinding('modal', function(element) {
      return new Modal(element, { isOpen: true });
    });
  };
}
export default Modal;