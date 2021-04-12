const toast = {
  heading: 'Toast',
  cssDocumentation: [],
  jsDocumentation: [],
  methodDocumentation: [],
  variation: [
    {
      subHeading: 'Danger',
      template: require('./danger.html'),
      trigger: () => {
        document
          .querySelector('#hcl-btn-toast-type1')
          .addEventListener('click', () => {
            document
              .querySelector('#hcl-toast-type1')
              .classList.remove('hcl-toast-hide');
          });
        document
          .querySelector('#hcl-toast-close1')
          .addEventListener('click', () => {
            document
              .querySelector('#hcl-toast-type1')
              .classList.add('hcl-toast-hide');
          });
      }
    },

    {
      subHeading: 'Info',
      template: require('./info.html'),
      trigger: () => {
        document
          .querySelector('#hcl-btn-toast-type2')
          .addEventListener('click', () => {
            document
              .querySelector('#hcl-toast-type2')
              .classList.remove('hcl-toast-hide');
          });
        document
          .querySelector('#hcl-toast-close2')
          .addEventListener('click', () => {
            document
              .querySelector('#hcl-toast-type2')
              .classList.add('hcl-toast-hide');
          });
      }
    },

    {
      subHeading: 'Success',
      template: require('./success.html'),
      trigger: () => {
        document
          .querySelector('#hcl-btn-toast-type3')
          .addEventListener('click', () => {
            document
              .querySelector('#hcl-toast-type3')
              .classList.remove('hcl-toast-hide');
          });
        document
          .querySelector('#hcl-toast-close3')
          .addEventListener('click', () => {
            document
              .querySelector('#hcl-toast-type3')
              .classList.add('hcl-toast-hide');
          });
      }
    },

    {
      subHeading: 'Warning',
      template: require('./warning.html'),
      trigger: () => {
        document
          .querySelector('#hcl-btn-toast-type4')
          .addEventListener('click', () => {
            document
              .querySelector('#hcl-toast-type4')
              .classList.remove('hcl-toast-hide');
          });
        document
          .querySelector('#hcl-toast-close4')
          .addEventListener('click', () => {
            document
              .querySelector('#hcl-toast-type4')
              .classList.add('hcl-toast-hide');
          });
      }
    }
  ]
};
export default toast;
