window.patron.dropdown('#top-dropdown', {
  position: 'top',
  attachElementToBody: true,
  onChange: (event, target) => {
    console.log(event, target);
  }
});
