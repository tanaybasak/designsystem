window.patron.dropdown('#multi-dropdown', {
  position: 'bottom',
  type: 'multiselect',
  onChange: (element, value) => {
    console.log(element, value);
  }
});
