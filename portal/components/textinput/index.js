const textinput = {
  heading: 'Textinput',
  cssDocumentation: [
    {
      name: '.hcl-form-control',
      description: `Input tag has class .hcl-form-control with a &lt;label&gt; text next to it. 
        &lt;br/&gt; &lt;label&gt; tag must always be placed next to various &lt;input&gt; field’s(text, password, email..) This allows highlighting the label when focus is made on the respective Input field.`
    },
    {
      name: '.hcl-form-group',
      description:
        'Both &lt;textarea&gt; &amp; &lt;label&gt; must be wrapped in with class .hcl-form-group'
    }
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
      subHeading: 'Textinput-with-error',
      className: 'hcl-col-12 hcl-col-md-6 hcl-col-lg-4',
      template: require('./textinput-with-error.html')
    },

    {
      subHeading: 'Textinput-with-helpertext',
      className: 'hcl-col-12 hcl-col-md-6 hcl-col-lg-4',
      template: require('./textinput-with-helpertext.html')
    }
  ]
};
export default textinput;
