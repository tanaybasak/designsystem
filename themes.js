Array.from(
  document.getElementById('themes-radio').getElementsByClassName('hcl-radio')
).forEach(element => {
  element.addEventListener('change', (event) => {
    themeChangeHandler(event);
  });
});

const themeChangeHandler = event => {
  console.log('themeChangeHandler',event);
  document.getElementById('main-wrapper').removeAttribute('class');
  document.getElementById('main-wrapper').classList.add(event.currentTarget.getAttribute('value'));
};
