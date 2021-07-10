export function render() {
  const pdsLogo = require('../../asset/pds.png');
  const version = require('../../package.json').version;
  const template = `
  <header class="hcl-header blue_active_blue_light" data-withsidenav="true">
  <a href="/" class="hcl-header-brand" tabindex="0">
    <img alt="Logo" width="109px" src="${pdsLogo}" />
  </a>
  <div class="hcl-header-wrapper">
    <ul class="hcl-header-icons">
      <li class="hcl-header-icon"><span class="">Patronus Vanilla Version ${version}<span></li>
      <li class="hcl-header-icon" id="toggleSlideout" data-target="#hcl-slideout-header-theme"
        style="cursor:pointer; padding: 10px">Setting</li>
      <li class="hcl-header-icon">
        <span class="hcl-toggle-small outline-toggle">
          <input type="checkbox" id="outline-toggle">
          <label class="hcl-toggle-label" aria-label="simple small toggle" for="outline-toggle">
            <span class="hcl-switch"></span>
          </label>
          <label class="hcl-toggle-off">Filled</label>
          <label class="hcl-toggle-on">Outline</label>
        </span>
      </li>
      <li class="hcl-header-icon">
        <span class="hcl-toggle-small rounded-toggle">
          <input type="checkbox" id="rounded-toggle">
          <label class="hcl-toggle-label" aria-label="disabled checked small toggle" for="rounded-toggle">
            <span class="hcl-switch"></span>
          </label>
          <label class="hcl-toggle-off">Sharp</label>
          <label class="hcl-toggle-on">Rounded</label>
        </span>
      </li>
      <li class="hcl-header-icon">
        <div id="theme-overflow" class="hcl-overlay-wrapper">
          <button class="hcl-btn hcl-primary hcl-sm" aria-label="Left Overflow Menu" role="Overflow Menu">
            <span>Theme : V2 Light</span>
            <svg class='hcl-btn-icon' viewBox='0 0 16 16'>
              <rect data-name='&lt;Transparent Rectangle&gt;' width='16' height='16' fill='none' />
              <path
                d='M14,14v1H2V14ZM2.71,8.77a2.51,2.51,0,0,1,0-3.54l2.5-2.5A2.5,2.5,0,0,1,6.5,2.07V1h1V2.08a2.41,2.41,0,0,1,1.24.65L13,7h0v5H12V8L8.74,11.27a2.5,2.5,0,0,1-3.53,0ZM3,7a1.46,1.46,0,0,0,.44,1.06l2.5,2.5a1.53,1.53,0,0,0,2.12,0L11.6,7,8,3.44A1.41,1.41,0,0,0,7.5,3.1V5h-1V3.08a1.46,1.46,0,0,0-.58.36l-2.5,2.5A1.46,1.46,0,0,0,3,7Z' />
            </svg>
          </button>
          <div class="hcl-overlay-container">
            <ul aria-labelledby="Right Overflow Menu" class="hcl-overflow-menu">
              <li class="hcl-overflow-option">
                <button class="hcl-overflow-option-item" aria-label="V1 Light" data-theme="blue_active_blue_light">
                  V1 Light
                </button>
              </li>
              <li class="hcl-overflow-option">
                <button class="hcl-overflow-option-item" aria-label="V2 Light" data-theme="blue_active_orange_light">
                  V2 Light
                </button>
              </li>
              <li class="hcl-overflow-option">
                <button class="hcl-overflow-option-item" aria-label="V1 Dark" data-theme="blue_active_blue_dark">
                  V1 Dark
                </button>
              </li>
              <li class="hcl-overflow-option">
                <button class="hcl-overflow-option-item" data-theme="blue_active_orange_dark" aria-label="V2 Dark">
                  V2 Dark
                </button>
              </li>
            </ul>
          </div>
        </div>
      </li>
    </ul>
    <div class="hcl-slideout hcl-slideout__default-border hcl-slideout-hide" tabindex="0"
      id="hcl-slideout-header-theme">
      <div class="hcl-slideout-mask hcl-slideout-mask-noback"></div>
      <div class="hcl-slideout-layout default">
        <header class="hcl-slideout-header">
          <div class="hcl-slideout-header__text" title="header">Header</div>
          <button class="hcl-slideout-close">
            <svg version="1.1" xmlns="https://www.w3.org/2000/svg" viewBox="0 0 16 16">
              <polygon
                points="15.393,2.021 13.979,0.607 8,6.586 2.021,0.607 0.607,2.021 6.586,8 0.607,13.979 2.021,15.393 8,9.414  13.979,15.393 15.393,13.979 9.414,8 " />
            </svg>
          </button>
        </header>
        <section class="hcl-slideout-content">
          <div class="hcl-row">
            <div class="hcl-col-12">
               <label class="hcl-label">Color </label>
              <div class="hcl-form-group">
                <div class="hcl-overlay-wrapper hcl-dropdown" id="dropdown-color">
                  <button class="hcl-btn hcl-dropdown-toggle hcl-form-control" id="bottom-dropdown-btn"
                    aria-haspopup="true" aria-controls="bottom-container" data-toggle="dropdown">
                    V1 Light
                  </button>
                  <div class="hcl-overlay-container">
                    <ul class="hcl-dropdown-menu" role="menu" aria-labelledby="dropdown-color">
                      <li class="hcl-dropdown-item" tabindex="0 aria-label="V1 Light" data-theme="blue_active_blue_light">V1 Light</li>
                      <li class="hcl-dropdown-item" tabindex="0"  aria-label="V2 Light" data-theme="blue_active_orange_light">V2 Light</li>
                      <li class="hcl-dropdown-item" tabindex="0" aria-label="V1 Dark" data-theme="blue_active_blue_dark">V1 Dark</li>
                      <li class="hcl-dropdown-item" tabindex="0" data-theme="blue_active_orange_dark" aria-label="V2 Dark">V2 Dark</li>
                    </ul>
                  </div>
                </div>
                <span class="hcl-helper-text"> Class: <span class="color-class-name hcl-helper-text">blue_active_orange_light</span> </span>
              </div>
            </div>
            <div class="hcl-col-12">
            <label class="hcl-label">Typography</label>
              <div class="hcl-form-group">
                <div class="hcl-overlay-wrapper hcl-dropdown" id="dropdown-typography">
                  <button class="hcl-btn hcl-dropdown-toggle hcl-form-control" id="bottom-dropdown-btn"
                    aria-haspopup="true" aria-controls="bottom-container" data-toggle="dropdown">
                    Productive
                  </button>
                  <div class="hcl-overlay-container">
                    <ul class="hcl-dropdown-menu" role="menu" aria-labelledby="dropdown-typography">
                      <li class="hcl-dropdown-item" tabindex="0">Productive</li>
                      <li class="hcl-dropdown-item" tabindex="0">Expressive</li>
                    </ul>
                  </div>
                </div>
                <span class="hcl-helper-text"> Class: <span class="typo-class-name hcl-helper-text">hcl-productive</span> </span>
              </div>
            </div>
            <div class="hcl-col-12">
           <label class="hcl-label"> Input </label>
              <div class="hcl-form-group">
                <div class="hcl-overlay-wrapper hcl-dropdown" id="dropdown-input">
                  <button class="hcl-btn hcl-dropdown-toggle hcl-form-control" id="bottom-dropdown-btn"
                    aria-haspopup="true" aria-controls="bottom-container" data-toggle="dropdown">
                    Filled
                  </button>
                  <div class="hcl-overlay-container">
                    <ul class="hcl-dropdown-menu" role="menu" aria-labelledby="dropdown-input">
                      <li class="hcl-dropdown-item" tabindex="0">Filled</li>
                      <li class="hcl-dropdown-item" tabindex="0">Outline</li>
                    </ul>
                  </div>
                </div>
             <span class="hcl-helper-text"> Class: <span class="input-class-name hcl-helper-text">filled</span> </span>
              </div>
            </div>
            <div class="hcl-col-12">
           <label class="hcl-label"> Corner</label>
              <div class="hcl-form-group">
                <div class="hcl-overlay-wrapper hcl-dropdown" id="dropdown-corner">
                  <button class="hcl-btn hcl-dropdown-toggle hcl-form-control" id="bottom-dropdown-btn"
                    aria-haspopup="true" aria-controls="bottom-container" data-toggle="dropdown">
                    Sharp
                  </button>
                  <div class="hcl-overlay-container">
                    <ul class="hcl-dropdown-menu" role="menu" aria-labelledby="dropdown-corner">
                      <li class="hcl-dropdown-item" tabindex="0">Sharp</li>
                      <li class="hcl-dropdown-item" tabindex="0">Small Rounded</li>
                      <li class="hcl-dropdown-item" tabindex="0">Rounded</li>
                    </ul>
                  </div>
                </div> 
              <span class="hcl-helper-text">  Class: <span class="corner-class-name hcl-helper-text">sharp</span> </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</header>
  `;
  return template;
}
