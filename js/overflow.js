import { PREFIX } from './utils/config';
import { trackDocumentClick } from './utils/dom';

class Overflow {
  constructor(element, options) {
    this.element= element;
    
    this.state = {
      isOpen: false,
      ...options
    };
    this.toggleState(this.state.isOpen);
  }
  

  toggleState = state => {
    if (state) {
       this.element.querySelector(".hcl-overflow-menu").classList.add(`${PREFIX}-show`);
       this.element.querySelector(".hcl-overflow-menu").classList.remove(`${PREFIX}-hidden`);
    } else {
      this.element.querySelector(".hcl-overflow-menu").classList.remove(`${PREFIX}-show`);
      this.element.querySelector(".hcl-overflow-menu").classList.add(`${PREFIX}-hidden`);
    }
  };

  attachEvents = () => {
    const icon = this.element.querySelector('.hcl-ellipsis');
    trackDocumentClick(this.element, () => {
      if (this.state.isOpen) {
        this.state.isOpen = !this.state.isOpen;
        this.toggleState(this.state.isOpen);   
      }
    });

    if (icon) {
      icon.addEventListener('keypress', function(event) {
        if (event.keyCode === 13) {
          event.preventDefault();
          icon.click();
        }
      });
    
      icon.addEventListener('click', event => {
        event.stopPropagation();
        trackDocumentClick(this.element, () => {
          if (this.state.isOpen) {
            this.state.isOpen = !this.state.isOpen;
            this.toggleState(this.state.isOpen);   
          }
        });
        this.state.isOpen = !this.state.isOpen;
        this.toggleState(this.state.isOpen);
      }); 

      this.element.querySelectorAll(`.${PREFIX}-overflow-option`)
        .forEach((item, index) => {
          item.addEventListener('click', event => {
            if (typeof this.state.onChange === 'function') {
              this.state.onChange(event, event.target.innerText);
            }
          });
      });
    };
  }
}

export default Overflow;
