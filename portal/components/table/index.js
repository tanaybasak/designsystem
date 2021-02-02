const table = {
  heading: 'Table',
  cssDocumentation: [
    {
      name: '.hcl-data-table',
      description: `Class given to &#60;table&#62; tag. This acts as default class for data-table.`
    },
    {
      name: '.hcl-data-table-borderless',
      description:
        'Class combined with default class adds table without border.'
    },
    {
      name: '.hcl-data-table-compact',
      description:
        'Class combined with default class makes table more compact by having a height of 1.5rem.'
    }
  ],
  variation: [
    {
      subHeading: 'Default',
      template: require('./borderless.html')
    },
    {
      subHeading: 'Small',
      template: require('./compact.html')
    }
  ]
};
export default table;
