const spinner = {
  heading: 'Spinner',
  cssDocumentation: [
    {
      name: '.hcl-spinner',
      description: 'This class is required to show large spinner.'
    },
    {
      name: '.hcl-spinner-inline',
      description: 'This class is required to show inline spinner.'
    },
    {
      name: '.hcl-lightbox',
      description: 'This class is required for overlay.'
    }
  ],
  jsDocumentation: [],
  methodDocumentation: [],
  variation: [
    {
      subHeading: 'Inline',
      template: require('./inline.html')
    },

    {
      subHeading: 'Large',
      template: require('./large.html')
    }
  ]
};
export default spinner;
