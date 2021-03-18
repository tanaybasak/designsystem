const contentswitcher = {
  heading: 'Content Switcher',
  cssDocumentation: [
    {
      name: '.hcl-content-switcher',
      description: 'Class used as wrapper of the content switcher buttons.'
    },
    {
      name: '.hcl-content-switcher-btn',
      description:
        'Each tab must be in &lt;button&gt; tag with class .hcl-content-switcher-btn and role=&#34;tab&#34;'
    }
  ],
  jsDocumentation: [
    {
      name: 'data-content-switcher',
      description:
        'for wrapper Content switcher elements. Role can also be specified accepting value as "tablist".'
    },
    {
      name: 'data-target',
      description: `must be specified for each Tab with a selector as string.
          Example: data-target=".filtered-items"`
    }
  ],
  methodDocumentation: [],
  variation: [
    {
      subHeading: 'Default',
      template: require('./default.html'),
      trigger: () => {
        window.patron.contentswitch('#content-switcher');
      }
    },

    {
      subHeading: 'Disabled',
      template: require('./disabled.html'),
      trigger: () => {
        window.patron.contentswitch('#content-switcher3', {
          selectedIndex: 2,
          disabled: [1],
          onChange: function () {}
        });
      }
    },

    {
      subHeading: 'Disabled-with-icons',
      template: require('./disabled-with-icons.html'),
      trigger: () => {
        window.patron.contentswitch('#content-switcher4', {
          selectedIndex: 2,
          disabled: [1],
          onChange: function () {}
        });
      }
    },

    {
      subHeading: 'With-icons',
      template: require('./with-icons.html'),
      trigger: () => {
        window.patron.contentswitch('#content-switcher2', {
          selectedIndex: 2,
          disabled: [],
          onChange: function () {}
        });
      }
    }
  ]
};
export default contentswitcher;
