const list = {
  heading: 'List',
  cssDocumentation: [
    {
      name: '.hcl-lower-alpha',
      description:
        'This class is used to set the list item numbered with lowercase letters'
    },
    {
      name: '.hcl-upper-alpha',
      description:
        'This class is used to set the list item numbered with uppercase letters'
    },
    {
      name: '.hcl-upper-roman',
      description:
        'This class is used to set the list item numbered with uppercase roman numbers.'
    },
    {
      name: '.hcl-lower-roman',
      description:
        'This class is used to set the list item numbered with lowercase roman numbers'
    },
    {
      name: '.hcl-decimal',
      description:
        'This class is used to set the list item numbered with numbers'
    },
    {
      name: '.hcl-circle',
      description: 'This class is used to set the list item marker to a circle.'
    },
    {
      name: '.hcl-square',
      description: 'This class is used to set the list item marker to a square.'
    },
    {
      name: '.hcl-disc',
      description: 'This class is used to set the list item marker to a bullet.'
    }
  ],
  jsDocumentation: [],
  methodDocumentation: [],
  variation: [
    {
      subHeading: 'Ordered',
      template: require('./ordered.html')
    },

    {
      subHeading: 'Unordered',
      template: require('./unordered.html')
    }
  ]
};
export default list;
