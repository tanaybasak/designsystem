const overflowmenu = {
  heading: 'Overflow Menu',
  cssDocumentation: [
    {
      name: '.hcl-overflow-option-disablebtn',
      description:
        'This class is required to disable option of the overflow menu.'
    },
    {
      name: '.hcl-overflow-option-dangerbtn',
      description:
        'This class is required to style option with danger colour (red).'
    },
    {
      name: '.hcl-overflow-separator',
      description: 'This class is required to create a separation line.'
    },
    {
      name: '.horizontal-ellipsis',
      description: 'This class is required to create horizontal ellipsis.'
    }
  ],
  jsDocumentation: [],
  methodDocumentation: [],
  variation: [
    {
      subHeading: 'Custom',
      template: require('./custom.html'),
      trigger: () => {
        window.patron.overflow('#custom-overflow-menu', {
          attachElementToBody: true,
          scrollListner: true,
          onChange: () => {}
        });
      }
    },

    {
      subHeading: 'Left',
      template: require('./left.html'),
      trigger: () => {
        window.patron.overflow('#left-overflow-menu', {
          onChange: () => {}
        });
      }
    },

    {
      subHeading: 'Right',
      template: require('./right.html'),
      trigger: () => {
        window.patron.overflow('#right-overflow-menu', {
          onChange: () => {}
        });
      }
    }
  ]
};
export default overflowmenu;
