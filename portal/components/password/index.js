const password = {
  heading: 'Password',
  cssDocumentation: [
    {
      name: '.hcl-form-control',
      description:
        'Input tag has class .hcl-form-control with a &lt;label&gt; text next to it. &lt;br/&gt; &lt;label&gt; tag must always be placed next to various &lt;input&gt; field’s(text, password, email..) This allows highlighting the label when focus is made on the respective Input field.'
    }
  ],
  jsDocumentation: [],
  methodDocumentation: [],
  variation: [
    {
      subHeading: 'Default',
      template: require('./default.html'),
      trigger: () => {
        window.patron.password('#defaultpassword');
        window.patron.tooltip('.default');
      }
    },

    {
      subHeading: 'Disabled',
      template: require('./disabled.html'),
      trigger: () => {
        window.patron.password('#disabledpassword');
      }
    },

    {
      subHeading: 'Password-with-error',
      template: require('./password-with-error.html'),
      trigger: () => {
        window.patron.password('#passwordwitherror', {
          visible: false
        });
        window.patron.tooltip('.with-error');
      }
    },

    {
      subHeading: 'Password-with-helpertext',
      template: require('./password-with-helpertext.html'),
      trigger: () => {
        window.patron.password('#passwordwithhelpertext');
        window.patron.tooltip('.with-helper');
      }
    }
  ]
};
export default password;
