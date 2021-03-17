export const getTitle = title => {
  return `
      <h2 class="title">${title}</h2>
      `;
};

export const getComponentVariation = (item, index) => {
  return `
    <div class="hcl-row mb-10 component-demo">
      <div class="hcl-col-12">
          <h4 class="subtitle mb-3">${item.subHeading}</h4>
          <div class="hcl-row">
            <div class="${
              item.className ? item.className : 'hcl-col-12 hcl-col-xl-8'
            }">
                <div class="p-3 mb-5">${item.template}</div>
            </div>
          </div>
          <div class="hcl-row">
            <div class="hcl-col-12 hcl-col-xl-8">
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
        </div>
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
      <div class="hcl-row mb-5">
      <div class="hcl-col-12 hcl-col-xl-10">
          <h6 class="mb-5">Classes</h6>
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
      </div>
  `;
};
export const getJSDocumentation = doc => {
  return `
    <div class="hcl-row mb-5">
        <div class="hcl-col-12 hcl-col-xl-10">
          <h6 class="mb-5">Modifiers</h6>
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
    </div>
  `;
};
const getJSDocumentationTpl = doc => {
  return `
      <tr>
          <td>${doc.name}</td>
          <td>${doc.default ? doc.default : '-'}</td>
          <td>${doc.description}</td>
      </tr>
  `;
};

export const getMethodDocumentation = doc => {
  return `
    <div class="hcl-row mb-5">
        <div class="hcl-col-12 hcl-col-xl-10">
            <h6 class="mb-5">Method</h6>
            <div class="hcl-data-table-wrapper data-table-sticky-header">
                <table class="hcl-data-table data-table-doc">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${doc.map(getMethodDocumentationTpl).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    `;
};
const getMethodDocumentationTpl = doc => {
  return `
        <tr>
            <td>${doc.name}</td>
            <td>${doc.description}</td>
        </tr>
    `;
};
