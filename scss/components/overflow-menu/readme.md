<div id="Overview"></div>

## Overflow Menu

Overflow Menu is used when additional options are available to the user and when there is a space constraint.

### Right Overflow Menu

Example of right

### Left Overflow Menu

Example of left

<div id="General-Guideline"></div>

### General Guidelines

**Actions**

- The actions within an overflow menu should be direct so users can quickly decide on an action.
- Actions that could cause a significant change to the user’s data (delete app, delete service, etc.) are separated by a horizontal rule and live below the primary set of actions.
- Some actions may be displayed as disabled (rather than removing them) when they can be used under certain conditions.

**Positioning**

Depending on where the Overflow Menu appears within the UI, the menu be left or right aligned so the Overflow Menu is clearly visible.

<div id="Spec-file"></div>

### Spec file

Overflow menu text should be set in sentence case with the first letter of the first word capitalized.

Spec file should be here.

<div id="Documentation"></div>

### Documentaion

##### HTML

For right overflow menu

Snippet of right html

For left overflow menu

Snippet of left html

#### Classes

| Name                       | Description                                                      |
| -------------------------- | ---------------------------------------------------------------- |
| .hcl-hidden                | This class is used to hide the overflow menu.                    |
| .hcl-overflow-disable      | This class is required to disable option of the overflow menu.   |
| .hcl-overflow-optiondanger | This class is required to style option with danger colour (red). |
| .hcl-overflow-separator    | This class is required to create a separation line.              |
| .horizontal-ellipsis       | This class is required to create horizontal ellipsis.            |
