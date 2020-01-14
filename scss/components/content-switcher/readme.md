## Content Switcher

Content switcher manipulates the content shown based on an exclusive or “either/or” pattern. 

### Default

Example of default

### With icons

Example of with-icons

### Disabled

Example of disabled

### Disabled with icons

Example of disabled-with-icons

### General Guidelines

* __Text:__ Be concise and specific. Titles have a maximum of two words. 
* **Default selection:** The default selection is based on the usage and it  is always the first option in a switcher. 
* **Content Switcher vs. Toggle:** The Content Switcher is used for large groups of content, as opposed to the Toggle which is meant for a “yes/no” or “on/off” binary decision. 

### Spec file

* Content Switchers have two main states: selected and unselected. By default, Content Switcher buttons are unselected with the selected state using a high contrast colour. 
* Hover states only apply to unselected buttons. 
* Content Switcher text should be set in sentence case, with only the first word in a phrase and any proper nouns capitalized.  
* The text should not exceed three words. 
* Content Switchers must have at least two options for the user to choose from. Each container that makes up the content switcher is equal in size. The width of a container is determined by the length of the longest container option text plus the 16 px / 1rem on both sides of the text.

### Documentation

##### Triggers

For Default

Snippet of default trigger

##### HTML

For Default

Snippet of default html

#### Classes

| Name                      | Description                                                                                           |
| ------------------------- | ----------------------------------------------------------------------------------------------------- |
| .hcl-content-switcher     | Class used as wrapper of the content switcher buttons.                                                |
| .hcl-content-switcher-btn | Each tab must be in &lt;button&gt; tag with class .hcl-content-switcher-btn and role=&#34;tab&#34;    |

#### data-attributes

* data-content-switcher for wrapper Content switcher elements. Role can also be specified accepting value as &#34;tablist&#34;. 
* data-target must be specified for each Tab with a selector as string.<br /> **Example:** data-target=&#34;.filtered-items&#34; 