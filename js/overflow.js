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

  focusNode = node => {
    if (node.classList.contains('hcl-overflow-option')) {
      node.children[0].focus();
    }
  };

  keyDownOnTree = (e) => {
    let key = e.which || e.keyCode;
    const nodeElement = e.currentTarget;
    const listItem = e.target.parentElement;
    const nodeStatus = nodeElement.classList.contains("hcl-show"); 
    
    if (nodeStatus === undefined || nodeStatus === null) {
        nodeStatus = 'false';
    }
    if(nodeStatus){
    switch (key) {
      case 40: {
        if(!listItem.nextElementSibling){
          this.focusNode(listItem.parentElement.firstElementChild);
        }
        else if(listItem.nextElementSibling.children[0].disabled === true){
          this.focusNode(listItem.nextElementSibling.nextElementSibling);
        }
        else{
          this.focusNode(listItem.nextElementSibling);
        }
        e.preventDefault();
        break;
      }
      case 38: {
        if(!listItem.previousElementSibling){
          this.focusNode(listItem.parentElement.lastElementChild);
        }
        else if(listItem.previousElementSibling.children[0].disabled === true){
          this.focusNode(listItem.previousElementSibling.previousElementSibling);
        }
        else{
          this.focusNode(listItem.previousElementSibling)
        }
        e.preventDefault();
        break;
      }
      case 13: {
        e.preventDefault();
        e.target.click();
        break;
      }
      default:
      break;
    }
  }
  }

  attachEvents = () => {
    const icon = this.element.children[0].children[0];
    const overflowMenu = this.element.children[0].children[1];
    let caretPosition;
    if(overflowMenu.classList.contains('hcl-overflow-right')){
      caretPosition = ((icon.offsetWidth/2) - 22).toString();
      overflowMenu.style.left = caretPosition.concat("px");
    }
    else if(overflowMenu.classList.contains('hcl-overflow-left')){
      caretPosition = ((icon.offsetWidth/2) - 18).toString();
      overflowMenu.style.right = caretPosition.concat("px");
    }

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

      overflowMenu.addEventListener('keydown', e => {
        this.keyDownOnTree(e, "true");
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
        this.focusNode(overflowMenu.children[0].children[0]);
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
