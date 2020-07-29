document.getElementById('theme-gbl').addEventListener('change', (event) => {
  if (event.target.checked) {
    document.getElementById('main-wrapper').classList.remove('theme-light');
    document.getElementById('main-wrapper').classList.add('theme-dark');
  } else {
    document.getElementById('main-wrapper').classList.remove('theme-dark');
    document.getElementById('main-wrapper').classList.add('theme-light');
  }
});
