const prettier = require('prettier');
const parser = require('prettier/parser-babel');
export async function render(htmlName) {
  const contentEl = document.getElementById('main');

  const imports = require('../components/imports');

  const componentInfo = imports[htmlName];
  const componentWrapper = await import('../pages/componentWrapper');

  const template = `
<div class="hcl-container">
<div class="hcl-row">
    <div class="hcl-col-12">${componentWrapper.getTitle(
      componentInfo.heading
    )}</div>
</div>
    
    ${componentInfo.variation
      .map(componentWrapper.getComponentVariation)
      .join('')}
      
      ${
        (componentInfo.cssDocumentation &&
          componentInfo.cssDocumentation.length > 0) ||
        (componentInfo.jsDocumentation &&
          componentInfo.jsDocumentation.length > 0)
          ? `<div class="documenation-title mb-5"> <h4>Documentation</h4></div>`
          : ``
      }
     
      ${
        componentInfo.cssDocumentation &&
        componentInfo.cssDocumentation.length > 0
          ? `
          ${componentWrapper.getCSSDocumentation(
            componentInfo.cssDocumentation
          )}
         
          `
          : ''
      }
      ${
        componentInfo.jsDocumentation &&
        componentInfo.jsDocumentation.length > 0
          ? `
          ${componentWrapper.getJSDocumentation(componentInfo.jsDocumentation)}
         
          `
          : ''
      }
      ${
        componentInfo.methodDocumentation &&
        componentInfo.methodDocumentation.length > 0
          ? `
          ${componentWrapper.getMethodDocumentation(
            componentInfo.methodDocumentation
          )}
         
          `
          : ''
      }
      
              
</div>
              `;
  contentEl.innerHTML = template;

  const codeSnippet = await import('../pages/codeSnippet');
  componentInfo.variation.map((item, index) => {
    const codeSnippetWrapper = contentEl.querySelector('#codeSnippet-' + index);
    const htmlCodeSnippet = codeSnippet.render(item.template, 'html');
    let jsCodeSnippet = null;
    if (item.trigger) {
      let str = item.trigger
        .toString()
        .replace('function trigger() {', '')
        .trim();
      str = str.substring(0, str.length - 1);

      str = str.replace(/  +/g, ' ');
      jsCodeSnippet = codeSnippet.render(
        prettier.format(str, {
          semi: false,
          parser: 'babel',
          trailingComma: 'none',
          plugins: [parser]
        }),
        'javascript'
      );
    }
    codeSnippetWrapper
      .querySelector('.html-section')
      .appendChild(htmlCodeSnippet);
    if (jsCodeSnippet) {
      codeSnippetWrapper
        .querySelector('.js-section')
        .appendChild(jsCodeSnippet);
    }

    if (item.trigger) {
      item.trigger();
    }

    window.patron.accordion('#codeSnippet-' + index, {
      uncontrolled: true
    });
  });
}
