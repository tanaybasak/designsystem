const textarea = {
  heading: 'Textarea',
  cssDocumentation: [
    { name: '.hcl-textarea', description: 'Class used in &lt;textarea&gt;' }
  ],
  jsDocumentation: [],
  methodDocumentation: [],
  variation: [
    {
      subHeading: 'Default',
      className: 'hcl-col-12 hcl-col-md-6 hcl-col-lg-4',
      template: require('./default.html')
    },

    {
      subHeading: 'Textarea-with-error',
      className: 'hcl-col-12 hcl-col-md-6 hcl-col-lg-4',
      template: require('./textarea-with-error.html')
    },

    {
      subHeading: 'Textarea-with-helpertext',
      className: 'hcl-col-12 hcl-col-md-6 hcl-col-lg-4',
      template: require('./textarea-with-helpertext.html')
    }
  ]
};
export default textarea;
