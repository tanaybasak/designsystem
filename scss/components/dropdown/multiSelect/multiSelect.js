window.patron.dropdown('#multi-dropdown', {
  position: 'bottom',
  type: 'multi',
  onChange: (element, value) => {
    console.log(element, value);
  }
});