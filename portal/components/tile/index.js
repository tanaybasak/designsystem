const tile = {
  heading: 'Tile',
  cssDocumentation: [
    {
      name: '.hcl-tile',
      description: 'This class is required to create readable tile.'
    },
    {
      name: '.hcl-tile-clickable',
      description: 'This class is required to create clickable tile.'
    },
    {
      name: '.hcl-tile-selectable',
      description: 'This class is required to create selectable tile.'
    },
    {
      name: '.hcl-tile-expandable',
      description: 'This class is required to create expandable tile.'
    }
  ],
  jsDocumentation: [],
  methodDocumentation: [],
  variation: [
    {
      subHeading: 'Clickable',
      template: require('./clickable.html'),
      trigger: () => {
        window.patron.tile('.hcl-tile-clickable');
      }
    },

    {
      subHeading: 'Expandable',
      template: require('./expandable.html'),
      trigger: () => {
        window.patron.tile('.hcl-tile-expandable');
      }
    },

    {
      subHeading: 'Readable',
      template: require('./readable.html')
    },

    {
      subHeading: 'Selectable',
      template: require('./selectable.html'),
      trigger: () => {
        window.patron.tile('.hcl-tile-select');
      }
    }
  ]
};
export default tile;
