const checkbox = {
  heading: 'Checkbox',
  cssDocumentation: [
    {
      name: '.hcl-checkbox',
      description: 'Class used for input&#91;type=&#34;checkbox&#34;&#93;'
    },
    {
      name: '.hcl-checkbox-label',
      description: 'Class to be used in &lt;label&gt; tag'
    },
    {
      name: '.hcl-checkbox-item',
      description: 'Wrapper class for input&#91;type=&#34;checkbox&#34;&#93;'
    },
    {
      name: '.hcl-checkbox-group',
      description: 'Wrapper class for grouping checkbox horizontally'
    },
    {
      name: '.hcl-stack-vertical',
      description:
        'Combined with .hcl-checkbox-group, acts as wrapper class for grouping checkbox vertically'
    }
  ],
  jsDocumentation: [],
  methodDocumentation: [],
  variation: [
    {
      subHeading: 'Default',
      template: require('./default.html')
    },

    {
      subHeading: 'Horizontal-grouping',
      template: require('./horizontal-grouping.html')
    },

    {
      subHeading: 'Indeterminate',
      template: require('./indeterminate.html'),
      trigger: () => {
        const checked = document.querySelector('#hcl-indeterminate-checkbox');
        checked.indeterminate = true;
      }
    },

    {
      subHeading: 'Vertical-grouping',
      template: require('./vertical-grouping.html')
    }
  ]
};
export default checkbox;
