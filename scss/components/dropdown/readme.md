## Dropdown

Dropdowns present a list of options that can be used to filter or sort existing content. They can also be used as menus. Their use as menus can be seen in tabs. At a smaller screen size, the tabs collapse into a dropdown. 

Example of dropdown

### General Guidelines

Dropdown versus Select: While the Dropdown and Select components look similar, they have different functions. Use the Dropdown component to filter or sort content on a page. Use the Select component inside a form where users are selecting from a list of options and submitting data. 

Another important difference between the two components is the underlying code. The dropdown component can be styled as needed, while the select component’s appearance will be determined by the browser being used. 

Labels: Labels inform users what to expect in the list of dropdown options. Use clear labels for the dropdown trigger so that users understand the purpose. Keep the label short and concise by limiting it to a single line of text. 

Dropdown options: Describe the dropdown option succinctly in one line of text. Never use images or icons within a dropdown. Avoid having multiple lines of text in a dropdown, but if text wrapping is necessary, limit it to two lines and an ellipsis (…) for overflow content. We recommend presenting the options in alphabetical order. 

Interaction: By default, the dropdown displays a label when closed. An open dropdown appears on click rather than on hover. Open dropdown drawers should appear above all other UI elements. They can be dismissed by clicking outside of the dropdown item or on the parent element. 

Selecting an item from the dropdown will close the drawer and the selected option will replace the label. 

### Spec file

Active: Placeholder text should remain when the user clicks into the text input and gets a cursor. Once the user starts typing, the hint text is replaced with the user input text. 

Help text: Help text appears below the label when the input is active. Help text remains visible while the input is focused and disappears after focus away. 

Error: Error messages appear below the input field and are always present while invalid. 

Disabled: Disabled state should has a .not-allowed cursor on hover. 

Typography: All dropdown text should be set in sentence case, with only the first word in a phrase and any proper nouns capitalized. Dropdown options should not exceed three words. 

States: Dropdowns have two states, open and closed. An open and closed dropdown should be the same width and appropriately fit the design, layout, and content. The height of a closed dropdown stays consistent while the height of an open dropdown will vary based on the amount of options it has. 

Spec file should be here.

### Documentaion

##### Triggers

Snippet of dropdown trigger

##### HTML

Snippet of dropdown html

#### Classes

| Name                          | Description                                |
|-------------------------------|--------------------------------------------|
| .top                          | Dropdown will open top                     |

#### Trigger Modifiers

| Default Selector            | Description                                |
|-----------------------------|--------------------------------------------|
| position: top               | Dropdown will open top                     |
| position: bottom            | Dropdown will open bottom                  |
