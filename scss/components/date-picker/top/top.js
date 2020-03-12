window.patron.datepicker('#top-datepicker', {
  position: 'top',
  onChange: (element, value) => {
    console.log(element, value);
  }
});
