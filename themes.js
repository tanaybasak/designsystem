document
  .getElementById('data-table-input')
  .addEventListener('change', event => {
    if (event.target.checked) {
      document.getElementById('theme-datatable').classList.remove('theme-dark');
      document.getElementById('theme-datatable').classList.add('theme-light');
    } else {
      document
        .getElementById('theme-datatable')
        .classList.remove('theme-light');
      document.getElementById('theme-datatable').classList.add('theme-dark');
    }
  });

document.getElementById('Tabs-input').addEventListener('change', event => {
  if (event.target.checked) {
    document.getElementById('theme-tab').classList.remove('theme-dark');
    document.getElementById('theme-tab').classList.add('theme-light');
  } else {
    document.getElementById('theme-tab').classList.remove('theme-light');
    document.getElementById('theme-tab').classList.add('theme-dark');
  }
});

document.getElementById('theme-gbl').addEventListener('change', event => {
  if (event.target.checked) {
    document.getElementById('main-wrapper').classList.add('body-dark');
  } else {
    document.getElementById('main-wrapper').classList.remove('body-dark');
  }
});
