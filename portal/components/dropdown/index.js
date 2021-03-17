const dropdown = {
  heading: 'Dropdown',
  cssDocumentation: [],
  jsDocumentation: [],
  methodDocumentation: [],
  variation: [
    {
      subHeading: 'Bottom',
      className: 'hcl-col-12 hcl-col-md-6 hcl-col-lg-4',
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
      className: 'hcl-col-12 hcl-col-md-6 hcl-col-lg-4',
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
      className: 'hcl-col-12 hcl-col-md-6 hcl-col-lg-4',
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
