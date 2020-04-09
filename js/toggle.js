class Toggle {
  constructor(element) {
    this.element = element;
  }

  keyDownOnToggle = e => {
    const key = e.which || e.keyCode;
    if (key === 39) {
      e.preventDefault();
      e.target.checked = true;
    } else if (key === 37) {
      e.preventDefault();
      e.target.checked = false;
    }
  };

  attachEvents = () => {
    const checkbox = this.element.querySelector('input[type="checkbox"]');
    checkbox.addEventListener('keydown', e => {
      this.keyDownOnToggle(e);
    });
  };
}

export default Toggle;
