export async function render() {
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
    <nav class="hcl-sidebar expanded" data-component="navigation" id="sidebar">
        <button class="hcl-sidebar-hamburger">
            <span></span>
            <span></span>
            <span></span>
        </button>
        <ul class="hcl-sidebar-list">
            ${await fetchlinks()}
        </ul>
    </nav>
`;
  return template;
}
