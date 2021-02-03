const dropdown = {
  heading: 'Dropdown',
  cssDocumentation: [],
  jsDocumentation: [],
  methodDocumentation: [],
  variation: [
    {
      subHeading: 'Bottom',
      template: require('./bottom.html'),
      trigger: () => {
        window.patron.dropdown('#bottom-dropdown', {
          position: 'bottom',
          onChange: () => {}
        });
      }
    },

    {
      subHeading: 'MultiSelect',
      template: require('./multiSelect.html'),
      trigger: () => {
        window.patron.dropdown('#multi-dropdown', {
          type: 'multi',
          position: 'bottom',
          onChange: () => {}
        });
      }
    },

    {
      subHeading: 'Top',
      template: require('./top.html'),
      trigger: () => {
        window.patron.dropdown('#top-dropdown', {
          position: 'top',
          attachElementToBody: true,
          onChange: () => {}
        });
      }
    }
  ]
};
export default dropdown;
