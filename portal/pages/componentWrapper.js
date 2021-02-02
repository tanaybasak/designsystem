export const getTitle = title => {
  return `
    <div class="component-title"><h2>${title}</h2></div>
    `;
};

export const getComponentVariation = (item, index) => {
  return `
    <div class="component-variation">
        <div class="component-subtitle"><h6>${item.subHeading}</h6></div>
        <div class="component-demo">${item.template}</div>
        <div class="component-code-snippet-wrapper">
            <ul class="hcl-accordion" id="codeSnippet-${index}">
                ${
                  item.template
                    ? `
                <li class="hcl-accordion-item">
                    <h4 class="hcl-accordion-title" tabindex="0">HTML</h4>
                    <div class="hcl-accordion-content-wrapper">
                        <div class="hcl-accordion-content html-section"></div>
                    </div>
                </li>`
                    : ``
                }
              ${
                item.trigger
                  ? ` 
                <li class="hcl-accordion-item">
                    <h4 class="hcl-accordion-title" tabindex="0">Javascript</h4>
                    <div class="hcl-accordion-content-wrapper">
                        <div class="hcl-accordion-content js-section"></div>
                    </div>
                </li>`
                  : ``
              }

            </ul>
        </div>
    </div>
    `;
};

const getCSSDocumentationTpl = doc => {
  return `
    <tr>
        <td>${doc.name}</td>
        <td>${doc.description}</td>
    </tr>
      `;
};
export const getCSSDocumentation = doc => {
  return `
    <div>
        <div class="component-subtitle"><h6>Classes</h6></div>
        <div class="hcl-data-table-wrapper data-table-sticky-header">
            <table class="hcl-data-table data-table-doc">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    ${doc.map(getCSSDocumentationTpl).join('')}
                </tbody>
            </table>
        </div>
    </div>
`;
};
export const getJSDocumentation = doc => {
  return `
    <div>
        <div class="component-subtitle"><h6>Modifiers</h6></div>
        <div class="hcl-data-table-wrapper data-table-sticky-header">
            <table class="hcl-data-table data-table-doc">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Default</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    ${doc.map(getJSDocumentationTpl).join('')}
                </tbody>
            </table>
        </div>
    </div>
`;
};
const getJSDocumentationTpl = doc => {
  return `
    <tr>
        <td>${doc.name}</td>
        <td>${doc.default}</td>
        <td>${doc.description}</td>
    </tr>
`;
};
