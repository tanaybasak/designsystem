const datatable = {
  heading: 'Data Table',
  cssDocumentation: [
    {
      name: '.hcl-data-table',
      description:
        'Class given to &lt;table&gt; tag. This acts as default class for data-table.'
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
    },
    {
      name: '.hcl-data-table-tall',
      description:
        'Class combined with default class adds tall table with height 4rem.'
    },
    {
      name: '.hcl-data-table-zebra',
      description:
        'Class combined with default class adds zebra-stripped table.'
    }
  ],
  jsDocumentation: [],
  methodDocumentation: [],
  variation: [
    {
      subHeading: 'Borderless',
      template: require('./borderless.html')
    },

    {
      subHeading: 'Compact',
      template: require('./compact.html')
    },

    {
      subHeading: 'Default',
      template: require('./default.html')
    },

    {
      subHeading: 'Overflow',
      template: require('./overflow.html'),
      trigger: () => {
        window.patron.overflow('#data-table-overflow-menu', {
          attachElementToBody: true,
          scrollListner: true
        });
        window.patron.overflow('#data-table-onhover-overflow-menu', {
          attachElementToBody: true,
          scrollListner: true
        });
      }
    },

    {
      subHeading: 'Tall',
      template: require('./tall.html')
    },

    {
      subHeading: 'Zebra',
      template: require('./zebra.html')
    }
  ]
};
export default datatable;
