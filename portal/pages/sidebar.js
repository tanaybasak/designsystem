export async function render() {
  const vanillaLogo = require('../../asset/vanilla.png');
  const fetchlinks = async () => {
    let links = ``;
    const sidebarItems = await import('../components/sidebarItems');

    function compare(a, b) {
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
      return 0;
    }

    sidebarItems.default.sort(compare);

    sidebarItems.default.map(link => {
      links += `
          <li class="hcl-sidebar-category" aria-expanded="false" data-navigation="${link.link}">
              <a tabindex="0" title="${link.title}" class="hcl-sidebar-item" href="#${link.link}">
                  <span class="hcl-sidebar-link no-icon">${link.title}</span>
              </a>
          </li>`;
    });
    return links;
  };
  const template = `
      <nav class="hcl-sidebar hcl-vanilla-sidebar" data-component="navigation" id="sidebar">
      <button class="hcl-sidebar-hamburger">
      <span></span>
      <span></span>
      <span></span>
    </button>
    <div class="hcl-sidebar-title">
      <img class="hcl-sidebar-title-icon" src="${vanillaLogo}" />
      <span class="hcl-sidebar-title-text">Vanilla</span>
      <span class="hcl-sidebar-title-toggle" tabindex="0">
        <svg height="24px" style="enable-background: new 0 0 512 512" version="1.1" viewbox="0 0 512 512" width="24px" xml:space="preserve" xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink">
          <polygon points="160,128.4 192.3,96 352,256 352,256 352,256 192.3,416 160,383.6 287.3,256 "></polygon>
        </svg>
      </span>
    </div>
          <ul class="hcl-sidebar-list">
              ${await fetchlinks()}
          </ul>
      </nav>
  `;
  return template;
}
