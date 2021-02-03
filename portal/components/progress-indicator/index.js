const progressindicator = {
  heading: 'Progress-indicator',
  cssDocumentation: [
    {
      name: '.hcl-pb-circle',
      description:
        'Default Class given to circle progress-indicator svg container. Shows the progress-indicator medium in size'
    },
    {
      name: '.hcl-pb-circle-large',
      description: 'Shows the circle progress-indicator large in size.'
    },
    {
      name: '.hcl-pb-circle-small',
      description: 'Shows the circle progress-indicator small in size.'
    },
    {
      name: '.hcl-pb-linear',
      description: 'Shows the linear progress-indicator.'
    }
  ],
  jsDocumentation: [],
  methodDocumentation: [],
  variation: [
    {
      subHeading: 'Circle-determinate',
      template: require('./circle-determinate.html'),
      trigger: () => {
        window.patron.progressindicator('#pbar-circle-determinate', {
          determinate: true,
          linear: false,
          value: 0.9
        });
      }
    },

    {
      subHeading: 'Circle-indeterminate',
      template: require('./circle-indeterminate.html'),
      trigger: () => {
        window.patron.progressindicator('#pbar-circle-indeterminate', {});
      }
    },

    {
      subHeading: 'Linear-determinate',
      template: require('./linear-determinate.html'),
      trigger: () => {
        window.patron.progressindicator('#pbar-linear-determinate', {
          determinate: true,
          linear: true,
          value: 0.9
        });
      }
    },

    {
      subHeading: 'Linear-indeterminate',
      template: require('./linear-indeterminate.html'),
      trigger: () => {
        window.patron.progressindicator('#pbar-linear-indeterminate', {});
      }
    }
  ]
};
export default progressindicator;
