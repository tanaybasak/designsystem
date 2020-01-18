<div id="Overview"></div>

## Tile

Tiles are a highly flexible component for displaying a wide variety of content, including informational, getting started, how-to, next steps, and more.

### Readable

Example of readable

### clickable

Example of clickable

### Selectable

Example of selectable

### Expandable

Example of expandable

<div id="General-Guideline"></div>

### General Guidelines

- Tiles have no pre-set styles for the content within them. You can customize tiles to fit your specific use case.

- When using a call-to-action (CTA) within a tile, use a Secondary button. Primary buttons should be reserved for the most important action a user can take on the page.

- _Read-Only:_ Read-Only tiles are used to display information to the user, such as features or services offered. They are often seen on marketing pages to promote content. These tiles can have internal calls-to-action (CTAs), such as a button or a link.

- _Clickable:_ Clickable tiles can be used as navigational items, where the entire tile is a clickable state, which redirects the user to a new page. Clickable tiles cannot contain separate internal CTAs.

- _Selectable:_ Selectable tiles work like a radio button, where the entire tile is a click target. Selectable tiles may contain internal CTAs (like links to docs) if the internal CTA is given its own click target. Selectable tiles work well for presenting options to a user in a structured manner, such as a set of pricing plans.

- _Expandable:_ Expandable tiles are helpful for hiding/showing larger amounts of content to a user. They can only be stacked in a single column, and cannot live in a row or horizontal grid. When expanded, tiles push content down the page. Expandable tiles may contain internal CTAs (like links to docs) if the internal CTA is given its own click target.

<div id="Spec-file"></div>

### Spec file

- Since tiles are basic containers, height and width may vary with content. Padding may depend on content type.

Spec file should be here.

<div id="Documentation"></div>

### Documentaion

##### HTML

For readable Tile

Snippet of readable html

For clickable Tile

Snippet of clickable html

For selectable Tile

Snippet of selectable html

For expandable Tile

Snippet of expandable html

#### Classes

| Name                 | Description                                       |
| -------------------- | ------------------------------------------------- |
| .hcl-tile            | This class is required to create readable tile.   |
| .hcl-tile-clickable  | This class is required to create clickable tile.  |
| .hcl-tile-selectable | This class is required to create selectable tile. |
| .hcl-tile-expandable | This class is required to create expandable tile. |
