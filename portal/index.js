import 'regenerator-runtime/runtime';
import Router from './router/router';
import Route from './router/route';
import './index.scss';
import './component.scss';
import './prism.scss';
const rootElement = document.getElementById('root');

const loadData = async () => {
  const header = await import('./pages/header');
  const sidebar = await import('./pages/sidebar');
  const content = await import('./pages/content');
  const sidebarItems = await import('./components/sidebarItems');
  let inputStyle = 'filled';
  let cornerStyle = 'sharp';

  rootElement.innerHTML = `
      ${header.render()}
      ${await sidebar.render()}
      ${content.render()}
  `;
  window.patron.sidebar('.hcl-vanilla-sidebar', {
    expanded: screen.width > 992
  });

  function clearstyle() {
    document
      .querySelector('.main-container')
      .classList.remove('outline-rounded');
    document.querySelector('.main-container').classList.remove('outline-sharp');
    document.querySelector('.main-container').classList.remove('rounded');
    document.querySelector('.main-container').classList.remove('sharp');
    document
      .querySelector('.main-container')
      .classList.remove('filled-rounded');
    document.querySelector('.main-container').classList.remove('filled-sharp');
  }

  document.querySelector('#toggleSlideout').addEventListener('click', () => {
    window.patron.slideout('#toggleSlideout', {
      closeOnEscape: true,
      callFromHeader: true
    });
  });

  window.patron.dropdown('#dropdown-color', {
    position: 'bottom',
    onChange: e => {
      document.body.classList.remove(
        'blue_active_blue_light',
        'blue_active_orange_light',
        'blue_active_blue_dark',
        'blue_active_orange_dark'
      );
      document.body.classList.add(e.currentTarget.dataset.theme);
      document.querySelector('.color-class-name').innerText =
        e.currentTarget.dataset.theme;
    }
  });

  window.patron.dropdown('#dropdown-corner', {
    position: 'bottom',
    onChange: e => {
      clearstyle();
      if (e.currentTarget.textContent.trim() === 'Rounded') {
        cornerStyle = 'rounded';
        const style = `${inputStyle}-${cornerStyle}`;
        document.querySelector('.main-container').classList.add(cornerStyle);
        document.querySelector('.main-container').classList.add(style);
      } else if (e.currentTarget.textContent.trim() === 'Small Rounded') {
        cornerStyle = 'small-rounded';
        document
          .querySelector('.main-container')
          .classList.add(`${inputStyle}-rounded`);
        document.querySelector('.main-container').classList.add(cornerStyle);
      } else {
        cornerStyle = 'sharp';
        const style = `${inputStyle}-${cornerStyle}`;
        document.querySelector('.main-container').classList.add(style);
        document.querySelector('.main-container').classList.add(cornerStyle);
      }
      document.querySelector('.corner-class-name').innerText = cornerStyle;
    }
  });

  window.patron.dropdown('#dropdown-typography', {
    position: 'bottom',
    onChange: e => {
      if (e.currentTarget.textContent.trim() === 'Expressive') {
        document.body.classList.remove('hcl-productive');
        document.body.classList.add('hcl-expressive');
      } else {
        document.body.classList.remove('hcl-expressive');
        document.body.classList.add('hcl-productive');
      }
    }
  });

  window.patron.dropdown('#dropdown-input', {
    position: 'bottom',
    onChange: e => {
      clearstyle();

      const roundedcorner =
        cornerStyle === 'small-rounded' ? 'rounded' : cornerStyle;
      const style = `${e.currentTarget.textContent
        .toLowerCase()
        .trim()}-${roundedcorner}`;
      if (e.currentTarget.textContent.trim() === 'Outline') {
        inputStyle = 'outline';
        document.querySelector('.main-container').classList.add(inputStyle);
        document.querySelector('.main-container').classList.add(style);
        document.querySelector('.main-container').classList.add(cornerStyle);
      } else {
        inputStyle = 'filled';
        document
          .querySelector('.main-container')
          .classList.remove('outline-sharp');
        document.querySelector('.main-container').classList.add(inputStyle);
        document.querySelector('.main-container').classList.add(style);
        document.querySelector('.main-container').classList.add(cornerStyle);
      }

      document.querySelector('.input-class-name').innerText = inputStyle;
    }
  });


  const routerArray = [];
  sidebarItems.default.map(item => {
    routerArray.push(new Route(item.link, item.default));
  });
  // eslint-disable-next-line no-new
  new Router(routerArray);
};
loadData();
