const toggle = {
  heading: 'Toggle',
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
