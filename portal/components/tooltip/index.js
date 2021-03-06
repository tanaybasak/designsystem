const tooltip = {
  heading: 'Tooltip',
  cssDocumentation: [],
  jsDocumentation: [
    {
      name: 'data-tooltip',
      description: 'Tooltip title. Can pass string or html'
    },
    {
      name: 'data-direction',
      default: 'bottom',
      description: 'Position of the tooltip. top , bottom , left , right'
    },
    {
      name: 'data-type',
      default: 'definition',
      description:
        'Icon – An icon tooltip is used to clarify the action or name of an interactive icon button.<br> definition – The definition tooltip provides additional help or defines an item or term'
    },
    {
      name: 'data-focus-on-click',
      description: `Interactive tooltips may contain rich text and other interactive elements like buttons or links`
    }
  ],
  methodDocumentation: [],
  variation: [
    {
      subHeading: 'Definition',
      template: require('./definition.html'),
      trigger: () => {
        window.patron.tooltip('.hcl-def-tooltip');
      }
    },

    {
      subHeading: 'Icon',
      template: require('./icon.html'),
      trigger: () => {
        window.patron.tooltip('.hcl-icon-tooltip');
      }
    },

    {
      subHeading: 'Interactive',
      template: require('./interactive.html'),
      trigger: () => {
        window.patron.tooltip('.hcl-interactive-tooltip');
      }
    }
  ]
};
export default tooltip;
