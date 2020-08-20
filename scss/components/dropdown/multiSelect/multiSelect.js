window.patron.dropdown('#multi-dropdown', {
  type: 'multi',
  position: 'top',
  attachElementToBody: true,
  scrollListner: true,
  onChange: (event, target) => {
    console.log(event, target);
  }
});
