import handleDataBinding from './utils/data-api';
class Tree {
  constructor(element) {
    this.element = element;
  }

  attachEvents = () => {
    var toggler = this.element.getElementsByClassName('caret');
    var i;

    for (i = 0; i < toggler.length; i++) {
      toggler[i].addEventListener('click', function() {
        this.parentElement.querySelector('.nested').classList.toggle('active');
        this.classList.toggle('caret-down');
      });
    }
  };

  static handleDataAPI = () => {
    handleDataBinding('tree', function(element) {
      return new Tree(element);
    });
  };
}
export default Tree;
