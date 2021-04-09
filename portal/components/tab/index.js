const tab = {
  heading: 'Tab',
  cssDocumentation: [
    { name: '.hcl-tab', description: `Wrapper for the Component itself` },
    {
      name: '.hcl-tabs-nav',
      description: `*&lt;ul&gt;* tag has class name as .hcl-tabs-nav. `
    },
    {
      name: '.hcl-tabs-nav-item',
      description: `&lt;li&gt; elements with class name .hcl-tabs-nav-item`
    },
    {
      name: '.hcl-tabs-panel',
      description: `All tab panels has class .hcl-tabs-panel`
    },
    {
      name: '.hcl-tabcontent',
      description: `Wrapper class for .hcl-tab-panel `
    },
    { name: '.active', description: `class for showing current active Tab. ` }
  ],
  jsDocumentation: [],
  methodDocumentation: [
    {
      name: 'tabs',
      description:
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
