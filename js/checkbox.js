class Checkbox {
  constructor(element, options) {
    this.element = element;

    this.state = {
      indeterminate: options.indeterminate || false,
      ...options
    };

    const checked = this.element.querySelector('input');
    checked.indeterminate = this.state.indeterminate;
  }
}

export default Checkbox;
