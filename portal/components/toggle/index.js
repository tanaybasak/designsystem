const toggle = {
  heading: 'Toggle',
  cssDocumentation: [
    { name: '.hcl-toggle', description: 'This is temporary description' },
    { name: '.hcl-toggle-small', description: 'This is temporary description' }
  ],
  jsDocumentation: [],
  methodDocumentation: [],
  variation: [
    {
      subHeading: 'Default',
      template: require('./default.html'),
      trigger: () => {
        window.patron.toggle('.hcl-toggle', {
          onChange: () => {}
        });
      }
    },

    {
      subHeading: 'Small',
      template: require('./small.html'),
      trigger: () => {
        window.patron.toggle('.hcl-toggle-small', {
          onChange: () => {}
        });
      }
    }
  ]
};
export default toggle;
