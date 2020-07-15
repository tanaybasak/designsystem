document.getElementById('breadcrumb').addEventListener('change', (event) => {
  if (event.target.checked) {
    document.getElementById('theme-breadcrumb').classList.remove('theme-dark');
    document.getElementById('theme-breadcrumb').classList.add('theme-light');
  } else {
    document.getElementById('theme-breadcrumb').classList.remove('theme-light');
    document.getElementById('theme-breadcrumb').classList.add('theme-dark');
  }
});

document.getElementById('overflow').addEventListener('change', (event) => {
  if (event.target.checked) {
    document.getElementById('theme-overflow').classList.remove('theme-dark');
    document.getElementById('theme-overflow').classList.add('theme-light');
  } else {
    document.getElementById('theme-overflow').classList.remove('theme-light');
    document.getElementById('theme-overflow').classList.add('theme-dark');
  }
});

document.getElementById('modal').addEventListener('change', (event) => {
  if (event.target.checked) {
    document.getElementById('theme-modal').classList.remove('theme-dark');
    document.getElementById('theme-modal').classList.add('theme-light');
  } else {
    document.getElementById('theme-modal').classList.remove('theme-light');
    document.getElementById('theme-modal').classList.add('theme-dark');
  }
});

document.getElementById('dropdown').addEventListener('change', (event) => {
  if (event.target.checked) {
    document.getElementById('theme-dropdown').classList.remove('theme-dark');
    document.getElementById('theme-dropdown').classList.add('theme-light');
  } else {
    document.getElementById('theme-dropdown').classList.remove('theme-light');
    document.getElementById('theme-dropdown').classList.add('theme-dark');
  }
});

document.getElementById('spinner').addEventListener('change', (event) => {
  if (event.target.checked) {
    document.getElementById('theme-spinner').classList.remove('theme-dark');
    document.getElementById('theme-spinner').classList.add('theme-light');
  } else {
    document.getElementById('theme-spinner').classList.remove('theme-light');
    document.getElementById('theme-spinner').classList.add('theme-dark');
  }
});

document.getElementById('radio').addEventListener('change', (event) => {
  if (event.target.checked) {
    document.getElementById('theme-radio').classList.remove('theme-dark');
    document.getElementById('theme-radio').classList.add('theme-light');
  } else {
    document.getElementById('theme-radio').classList.remove('theme-light');
    document.getElementById('theme-radio').classList.add('theme-dark');
  }
});

document.getElementById('textArea').addEventListener('change', (event) => {
  if (event.target.checked) {
    document.getElementById('theme-textArea').classList.remove('theme-dark');
    document.getElementById('theme-textArea').classList.add('theme-light');
  } else {
    document.getElementById('theme-textArea').classList.remove('theme-light');
    document.getElementById('theme-textArea').classList.add('theme-dark');
  }
});

document.getElementById('file-input').addEventListener('change', (event) => {
  if (event.target.checked) {
    document
      .getElementById('theme-fileUploader')
      .classList.remove('theme-dark');
    document.getElementById('theme-fileUploader').classList.add('theme-light');
  } else {
    document
      .getElementById('theme-fileUploader')
      .classList.remove('theme-light');
    document.getElementById('theme-fileUploader').classList.add('theme-dark');
  }
});

document
  .getElementById('data-table-input')
  .addEventListener('change', (event) => {
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

document.getElementById('Tabs-input').addEventListener('change', (event) => {
  if (event.target.checked) {
    document.getElementById('theme-tab').classList.remove('theme-dark');
    document.getElementById('theme-tab').classList.add('theme-light');
  } else {
    document.getElementById('theme-tab').classList.remove('theme-light');
    document.getElementById('theme-tab').classList.add('theme-dark');
  }
});

document.getElementById('theme-gbl').addEventListener('change', (event) => {
  if (event.target.checked) {
    document.getElementById('main-wrapper').classList.add('body-dark');
  } else {
    document.getElementById('main-wrapper').classList.remove('body-dark');
  }
});
