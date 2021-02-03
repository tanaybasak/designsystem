const radio = {
  heading: 'Radio',
  cssDocumentation: [
    { name: '.hcl-radio', description: 'Class used for &lt;input&gt; tag' },
    {
      name: '.hcl-radio-label',
      description: 'Class to be used in &lt;label&gt; tag'
    },
    { name: '.hcl-radio-item', description: 'Wrapper Class for &lt;input&gt;' },
    {
      name: '.hcl-radio-group',
      description: 'Wrapper Class for grouping radio horizontally'
    },
    {
      name: '.hcl-stack-vertical',
      description:
        'Combined with .hcl-radio-group, acts as Wrapper Class for grouping radio vertically'
    }
  ],
  jsDocumentation: [
    { name: 'hcl-temporary', description: 'This is temporary description' }
  ],
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
      subHeading: 'Vertical-grouping',
      template: require('./vertical-grouping.html')
    }
  ]
};
export default radio;
