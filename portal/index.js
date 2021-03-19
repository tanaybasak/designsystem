import 'regenerator-runtime/runtime';
import Router from './router/router';
import Route from './router/route';
import './index.scss';
import './component.scss';
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

      const theme = document.getElementById('prism-light');
      if (e.currentTarget.dataset.theme.endsWith('dark')) {
        theme.href = globalPrismDark;
      } else {
        theme.href = globalPrismLight;
      }
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
// Remove Dark Theme on Initial Load
const prismDark = document.getElementById('prism-dark');
const prismLight = document.getElementById('prism-light');
const globalPrismLight = prismLight.href;
const globalPrismDark = prismDark.href;
prismDark.parentNode.removeChild(prismDark);
