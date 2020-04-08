- **Placement:** Icon tooltips and interactive tooltips may be positioned **top**, **bottom**, **left**, or **right** to the trigger item. The container of the tooltip text may be aligned to **start**, **center** or **end**.
- Note that left and right positioning is not available for definition tooltip. This ensures the tooltip does not obstruct important information to the left or right of the trigger word.
- **Guidance:** The tooltip content should only contain one or two words.
- **Behaviour:** Icon tooltips appear on hover and focus.

**Definition tooltip**: The definition tooltip provides additional help or defines an item or term. It may be used on the label of a UI element, or on a word embedded in a paragraph.

**Guidance:**

- Should contain brief, read-only text
- Use on proper nouns, technical terms, or acronyms with two letters or more
- Do not use a definition tooltip on words with fewer than two letters

**Behaviour:**

- Definition tooltips appear on hover and focus

**Interactive tooltip**: Interactive tooltip may contain rich text and other interactive elements like buttons or links. In general, hiding interactive content in a tooltip is discouraged. Interactive tooltips are best used for onboarding experiences and product tours.

**Guidance:**

- If a user may need to visit an external resource, like while using a form, include a link in your interactive tooltip
- Don’t use without a label. Consider the context a user needs before clicking a link

**Behaviour:**

- Interactive tooltips appear when the user clicks on an info icon
- They persistent until intentionally dismissed by clicking outside of the tooltip
