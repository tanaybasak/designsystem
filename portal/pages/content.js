export function render() {
  const template = `
<main class="main-container${
    screen.width > 992 ? ' sidebar-expanded' : ''
  }" data-withsidenav="true" id="main">
    <div class="loading-indicator-backdrop">
        <div class="hcl-pb-circle-large loading-indicator" id="pbar-circle-indeterminate">
            <svg class="hcl-pb-circle-indeterminate" viewBox="25 25 50 50">
                <circle class="hcl-pb-bgcircle pb-circle" cx="50" cy="50" r="20"></circle>
                <circle class="hcl-pb-maincircle pb-circle" cx="50" cy="50" r="20"></circle>
                <circle class="hcl-pb-dot1 dot pb-circle" cx="50" cy="50" r="20"></circle>
                <circle class="hcl-pb-dot2 dot pb-circle" cx="50" cy="50" r="20"></circle>
                <circle class="hcl-pb-dot3 dot pb-circle" cx="50" cy="50" r="20"></circle>
            </svg>
        </div>
    </div>
</main>
      `;
  return template;
}
