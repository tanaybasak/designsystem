export function render() {
  const pdsLogo = require('../../asset/pds.png');
  const version = 'v1.8';
  const template = `
    <header class="hcl-header" data-withsidenav="true">
        <a href="/" class="hcl-header-brand" tabindex="0">
            <img
                alt="Logo"
                width="109px"
                src="${pdsLogo}"
            />
        </a>
        <div class="hcl-header-wrapper">
            <ul class="hcl-header-icons">
            <li class="hcl-header-icon"><span class="version">${version}<span></li>
                <li class="hcl-header-icon">
                    <div class="hcl-overlay-wrapper hcl-dropdown" id="bottom-dropdown">
                        <button
                            class="hcl-btn hcl-dropdown-toggle"
                            id="bottom-dropdown-btn"
                            aria-haspopup="true"
                            aria-controls="bottom-container"
                            data-toggle="dropdown"
                        >
                            V1 Light
                        </button>
                        <div class="hcl-overlay-container">
                            <ul
                                class="hcl-dropdown-menu"
                                role="menu"
                                aria-labelledby="bottom-dropdown-btn"
                            >
                                <li class="hcl-dropdown-item" data-theme="blue_active_blue_light" tabindex="0">V1 Light</li>
                                <li class="hcl-dropdown-item" data-theme="blue_active_orange_light" tabindex="0">V2 Light</li>
                                <li class="hcl-dropdown-item" data-theme="blue_active_blue_dark" tabindex="0">V1 Dark</li>
                                <li class="hcl-dropdown-item" data-theme="blue_active_orange_dark" tabindex="0">V2 Dark</li>
                            </ul>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </header>
`;
  return template;
}
