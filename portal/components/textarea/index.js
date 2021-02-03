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
      template: require('./default.html')
    },

    {
      subHeading: 'Textarea-with-error',
      template: require('./textarea-with-error.html')
    },

    {
      subHeading: 'Textarea-with-helpertext',
      template: require('./textarea-with-helpertext.html')
    }
  ]
};
export default textarea;
