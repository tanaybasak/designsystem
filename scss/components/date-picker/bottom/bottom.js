window.patron.datepicker('#bottom-datepicker', {
  position: 'top',
  onChange: (element, value) => {
    console.log(element, value);
  }
});
