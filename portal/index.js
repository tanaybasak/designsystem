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
  rootElement.innerHTML = `
      ${header.render()}
      ${await sidebar.render()}
      ${content.render()}
  `;
  window.patron.sidebar('.hcl-vanilla-sidebar', {
    expanded: screen.width > 992
  });
  window.patron.overflow('#theme-overflow', {
    onChange: e => {
      document.body.classList.remove(
        'blue_active_blue_light',
        'blue_active_orange_light',
        'blue_active_blue_dark',
        'blue_active_orange_dark'
      );
      document.body.classList.add(e.currentTarget.dataset.theme);
      document
        .querySelector('#theme-overflow')
        .firstElementChild.querySelector(
          'span'
        ).innerHTML = `Theme : ${e.currentTarget.textContent.trim()}`;
    }
  });

  function clearstyle() {
    document.body.classList.remove('outline-rounded');
    document.body.classList.remove('outline-sharp');
    document.body.classList.remove('rounded');
    document.body.classList.remove('sharp');
    document.body.classList.remove('filled-rounded');
    document.body.classList.remove('filled-sharp');
  }

  function addStyleClass(outline, rounded) {
    if (outline) {
      if (rounded) {
        document.body.classList.add('outline-rounded');
        document.body.classList.add('rounded');
      } else {
        document.body.classList.add('outline-sharp');
        document.body.classList.add('sharp');
      }
    } else {
      if (rounded) {
        document.body.classList.add('filled-rounded');
        document.body.classList.add('rounded');
      } else {
        document.body.classList.add('filled-sharp');
        document.body.classList.add('sharp');
      }
    }
  }

  document.querySelector('#rounded-toggle').addEventListener('change', e => {
    clearstyle();
    addStyleClass(
      document.querySelector('#outline-toggle').checked,
      e.target.checked
    );
  });

  document.querySelector('#outline-toggle').addEventListener('change', e => {
    clearstyle();
    addStyleClass(
      e.target.checked,
      document.querySelector('#rounded-toggle').checked
    );
  });

  document.querySelector('#typo-toggle').addEventListener('change', e => {
    if (e.target.checked) {
      document.body.classList.remove('hcl-productive');
      document.body.classList.add('hcl-expressive');
    } else {
      document.body.classList.remove('hcl-expressive');
      document.body.classList.add('hcl-productive');
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
