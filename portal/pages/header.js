export function render() {
  const pdsLogo = require('../../asset/pds.png');
  const version = require('../../package.json').version;
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
              <li class="hcl-header-icon"><span class="">Patronus Vanilla Version ${version}<span></li>
                  <li class="hcl-header-icon">
                  <div id="theme-overflow" class="hcl-overlay-wrapper">
  <button class="hcl-btn hcl-primary hcl-sm" aria-label="Left Overflow Menu" role="Overflow Menu">
  
  <span>Theme : V2 Light</span>
            <svg
              class='hcl-btn-icon'
              viewBox='0 0 16 16'
            >
              <rect
                data-name='&lt;Transparent Rectangle&gt;'
                width='16'
                height='16'
                fill='none'
              />
              <path
                d='M14,14v1H2V14ZM2.71,8.77a2.51,2.51,0,0,1,0-3.54l2.5-2.5A2.5,2.5,0,0,1,6.5,2.07V1h1V2.08a2.41,2.41,0,0,1,1.24.65L13,7h0v5H12V8L8.74,11.27a2.5,2.5,0,0,1-3.53,0ZM3,7a1.46,1.46,0,0,0,.44,1.06l2.5,2.5a1.53,1.53,0,0,0,2.12,0L11.6,7,8,3.44A1.41,1.41,0,0,0,7.5,3.1V5h-1V3.08a1.46,1.46,0,0,0-.58.36l-2.5,2.5A1.46,1.46,0,0,0,3,7Z'
              />
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
        <button class="hcl-overflow-option-item"  data-theme="blue_active_orange_dark" aria-label="V2 Dark">
        V2 Dark
        </button>
      </li>
      
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
