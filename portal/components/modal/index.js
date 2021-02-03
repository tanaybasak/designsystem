const modal = {
  heading: 'Modal',
  cssDocumentation: [
    {
      name: '.hcl-modal',
      description: 'This class is required to show modal along with overlay.'
    },
    {
      name: '.hcl-modal-hide',
      description:
        'This class is required to hide the modal along with overlay.'
    },
    {
      name: '.hcl-modal-container-danger',
      description:
        'This class is required to style modal with danger colour (red).'
    }
  ],
  jsDocumentation: [],
  methodDocumentation: [],
  variation: [
    {
      subHeading: 'Danger',
      template: require('./danger.html'),
      trigger: () => {
        window.patron.modal('#hcl-modal-danger', {
          onChange: () => {},
          keyboard: true
        });
      }
    },

    {
      subHeading: 'Danger-action',
      template: require('./danger-action.html'),
      trigger: () => {
        window.patron.modal('#hcl-modal-danger-action', {
          onChange: () => {},
          keyboard: true
        });
      }
    },

    {
      subHeading: 'Danger-label',
      template: require('./danger-label.html'),
      trigger: () => {
        window.patron.modal('#hcl-modal-danger-label', {
          onChange: () => {},
          keyboard: true
        });
      }
    },

    {
      subHeading: 'Danger-label-action',
      template: require('./danger-label-action.html'),
      trigger: () => {
        window.patron.modal('#hcl-modal-danger-label-action', {
          onChange: () => {},
          keyboard: true
        });
      }
    },

    {
      subHeading: 'Success',
      template: require('./success.html'),
      trigger: () => {
        window.patron.modal('#hcl-modal-success', {
          onChange: () => {},
          keyboard: true
        });
      }
    },

    {
      subHeading: 'Success-action',
      template: require('./success-action.html'),
      trigger: () => {
        window.patron.modal('#hcl-modal-success-action', {
          onChange: () => {},
          keyboard: true
        });
      }
    },

    {
      subHeading: 'Success-label',
      template: require('./success-label.html'),
      trigger: () => {
        window.patron.modal('#hcl-modal-success-label', {
          onChange: () => {},
          keyboard: true
        });
      }
    },

    {
      subHeading: 'Success-label-action',
      template: require('./success-label-action.html')
    },

    {
      subHeading: 'Warning',
      template: require('./warning.html'),
      trigger: () => {
        window.patron.modal('#hcl-modal-warning', {
          onChange: () => {},
          keyboard: true
        });
      }
    },

    {
      subHeading: 'Warning-label-action',
      template: require('./warning-label-action.html'),
      trigger: () => {
        window.patron.modal('#hcl-modal-warning-label-action', {
          onChange: () => {},
          keyboard: true
        });
      }
    }
  ]
};
export default modal;
