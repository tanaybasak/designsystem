export function render() {
  const template = `
          <main class="main-container${
            screen.width > 992 ? ' sidebar-expanded' : ''
          }" data-withsidenav="true" id="main"></main>
      `;
  return template;
}
