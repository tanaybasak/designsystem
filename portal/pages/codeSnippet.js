import Prism from 'prismjs';

var NEW_LINE_EXP = /\n(?!$)/g;
var lineNumbersWrapper;

Prism.hooks.add('after-tokenize', function (env) {
  var match = env.code.match(NEW_LINE_EXP);
  var linesNum = match ? match.length + 1 : 1;
  var lines = new Array(linesNum + 1).join(`<span></span>`);

  lineNumbersWrapper = `${lines}`;
});

export function render(code, type) {
  const copyCode = () => {
    if (!navigator.clipboard) {
      fallbackCopyTextToClipboard(code);
      return;
    }

    navigator.clipboard.writeText(code).then(
      function () {},
      function (err) {
        console.error('Async: Could not copy text: ', err);
      }
    );
  };
  const fallbackCopyTextToClipboard = text => {
    var textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err);
    }
    document.body.removeChild(textArea);
  };
  const html = Prism.highlight(code.trim(), Prism.languages[type], type);

  const containerWrapperDiv = document.createElement('div');
  containerWrapperDiv.setAttribute('class', 'code-wrapper');

  const containerDiv = document.createElement('div');

  const codeSnippetButton = document.createElement('button');
  codeSnippetButton.setAttribute('class', 'hcl-btn hcl-ghost copy-snippet');
  codeSnippetButton.setAttribute('title', 'Copy to clipboard');
  codeSnippetButton.innerHTML = `<svg xmlns="https://www.w3.org/2000/svg" viewBox="0 0 16 16"><rect data-name="<Transparent Rectangle>" width="16" height="16" fill="none"></rect><path d="M11.5,3h-5A2.5,2.5,0,0,0,4,5.5v7A2.5,2.5,0,0,0,6.5,15h5A2.5,2.5,0,0,0,14,12.5v-7A2.5,2.5,0,0,0,11.5,3ZM13,12.5A1.5,1.5,0,0,1,11.5,14h-5A1.5,1.5,0,0,1,5,12.5v-7A1.5,1.5,0,0,1,6.5,4h5A1.5,1.5,0,0,1,13,5.5ZM6,7h6V8H6Zm0,3h5v1H6ZM4.5,2A1.5,1.5,0,0,0,3,3.5V9H2V3.5A2.5,2.5,0,0,1,4.5,1H9V2Z"></path></svg>`;
  codeSnippetButton.addEventListener('click', copyCode);
  containerWrapperDiv.appendChild(codeSnippetButton);

  containerDiv.setAttribute('class', 'code-snippet-wrapper');
  const preTag = document.createElement('pre');
  preTag.setAttribute('class', `line-numbers language-${type}`);

  const codeTag = document.createElement('code');
  codeTag.setAttribute('class', `language-${type}`);

  codeTag.innerHTML = html;

  const lineNumber = document.createElement('span');
  lineNumber.setAttribute('class', 'span-line-number ');
  lineNumber.innerHTML = lineNumbersWrapper;
  preTag.appendChild(codeTag);
  preTag.appendChild(lineNumber);

  containerDiv.appendChild(preTag);
  containerWrapperDiv.appendChild(containerDiv);

  return containerWrapperDiv;
}
