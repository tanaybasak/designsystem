## Tabs

Tabs are used to quickly navigate between views within the same context.

Example of tab

### General Guidelines

__Label__ 

Each Tab label describes its content and sets user expectations. Labels are concise and use one to two words maximum. Keep in mind that at mobile widths, the character length of a title will impact the experience. Icons are not permitted in tab labels. 

 

__Number of Tabs__ 

A maximum of six Tabs may be displayed. This is to maintain an uncluttered UI and reduce cognitive load for users. 

 

__Order__ 

Tab order should be consistent across an experience. Tabs with related content should be grouped adjacent to each other. 

### Spec file

Tab label should be set in sentence case, and should not exceed three words. 

Spec file should be here.

### Documentaion

##### Triggers

Snippet of tab trigger

##### HTML

Snippet of tab html

#### Classes

| Name                          | Description                                                       |
|-------------------------------|-------------------------------------------------------------------|
| .hcl-tab                      | Wrapper for the Component itself                                  |
| .hcl-tabs-nav                 | *<ul>* tag has class name as .hcl-tabs-nav.                       |
| .hcl-tabs-nav-item            | &lt;li&gt; elements with class name .hcl-tabs-nav-item            |
| .hcl-tabs-panel               | All tab panels has class .hcl-tabs-panel                          |
| .hcl-tabcontent               | Wrapper class for .hcl-tab-panel                                  |

#### Public Methods

| Name    | Params | Description                                                                                        |
|---------|--------|----------------------------------------------------------------------------------------------------|
| tabs    |        | Accepts Object with parameters - selectedIndex(number), disabled(array), onChange(call back event) |