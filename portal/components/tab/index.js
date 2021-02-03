const tab = {
  heading: 'Tab',
  cssDocumentation: [],
  jsDocumentation: [],
  methodDocumentation: [
    { name: 'tabs', description: '' },
    {
      name:
        'Accepts Object with parameters - selectedIndex(number), disabled(array), onChange(call back event)'
    }
  ],
  variation: [
    {
      subHeading: 'Tab',
      template: require('./tab.html'),
      trigger: () => {
        window.patron.tabs('#tabsjs', {
          selectedIndex: 2,
          disabled: [2],
          onChange: function () {}
        });
      }
    }
  ]
};
export default tab;
