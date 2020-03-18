
## Number Input

Number input are similar to text inputs, but contain controls used to increase or decrease an incremental value.

### Basic

Example of numberInput

### With Optional Helper Text

Example of optionalHelperNumberInput

### With Validation

Example of validationNumberInput

### Disabled

Example of disabledNumberInput



### General Guidelines

- Do not use number inputs when large value changes are expected. They work best for making small, incremental changes that only require a few clicks.

- Enable the user to also choose to type a number in the field.

- Ensure that a default value is shown within the field.

- Use a clear and concise label for the number input.

- Use sentence-style capitalization (only the first word in a phrase and any proper nouns capitalized) for the label.

- For **label** and **validation** guidance refer to text input (LINK).



### Spec file

Number input labels should use sentence case, with only the first word in a phrase and any proper nouns capitalized.

#### States

**Active**

Number input should have a default number to start. The input should never be empty.

**Help text**

Help text appears below the label when the input is active. Help text remains visible while the input is focused and disappears after focus away.

**Error**

Error messages appear below the input field and are always present while invalid.

**Disabled**

Disabled state should have a “.not-allowed” cursor on hover.



### Documentaion

##### Triggers

For Number Input

Snippet of numberInput trigger

##### HTML

For NumberInput

Snippet of numberInput html

For NumberInput With Optional Helper Text

Snippet of optionalHelperNumberInput html

For NumberInput With Validation

Snippet of validationNumberInput html

For Disabled NumberInput

Snippet of disabledNumberInput html
