## Accordion

Accordion helps you expand and collapse sections of content. Accordions are one of the key components that provide for progressive disclosure – to show users just the important information in a particular context first while giving them control over how much more they want to see.

### Controlled Accrdion

Example of controlled accordion

### Uncontrolled Accordion

Example of Uncontrolled accordion

### General Guidelines

\. Use accordions when you need to consume specific areas of content within a page or when vertical space is limited. 
\. Use accordions when there is enough content to condense. Avoid nested accordions because it increases the cognitive load for users. 
\. Avoid allowing multiple open panes if there is more content above and below the accordion. 
\. Users may have multiple accordions open at the same time. 
\. The entire header area of each title is clickable which helps them expand or collapse the content below it. 

### Spec file

Spec file should be here.

### Documentaion

##### Triggers

For controlled accordion

Snippet of controlled accordion

For uncontrolled accordion

Snippet of uncontrolled accordion

##### HTML

For controlled accordion

Snippet of controlled accordion

For uncontrolled accordion

Snippet of uncontrolled accordion

#### Modifiers

Use these modifiers with `.bx--accordion` class.

| Default Selector            | Description                                |
|-----------------------------|--------------------------------------------|
| .bx--accordion__item--active | The className for an active accordion item |

#### Public Methods

| Name    | Params | Description          |
|---------|--------|----------------------|
| release |        | Deletes the instance |

#### Options

| Option                   | Default Selector              | Description                                       |
|--------------------------|-------------------------------|---------------------------------------------------|
| selectorInit             | `[data-accordion]`            | The selector to find the accordion                |
| selectorAccordionItem    | `[data-accordion-item]`       | The selector to find the accordion item component |
| selectorAccordionContent | `.bx--accordion__content`     | The selector for the accordion content element    |
| classActive              | `bx--accordion__item--active` | The className for an active accordion item        |

#### Classes

| Name                          | Description                                |
|-------------------------------|--------------------------------------------|
| `bx--accordion__item--active` | The className for an active accordion item |
