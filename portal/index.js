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

  document.querySelector('#rounded-toggle').addEventListener('change', e => {
    clearstyle();
    if (e.target.checked) {
      document.querySelector('.main-container').classList.add('rounded');
      if (document.querySelector('#outline-toggle').checked) {
        document
          .querySelector('.main-container')
          .classList.add('outline-rounded');
      } else {
        document
          .querySelector('.main-container')
          .classList.add('filled-rounded');
      }
    } else {
      document.querySelector('.main-container').classList.add('sharp');
      if (document.querySelector('#outline-toggle').checked) {
        document
          .querySelector('.main-container')
          .classList.add('outline-sharp');
      } else {
        document.querySelector('.main-container').classList.add('filled-sharp');
      }
    }
  });

  document.querySelector('#outline-toggle').addEventListener('change', e => {
    clearstyle();
    if (e.target.checked) {
      document.querySelector('.main-container').classList.add('outline');
      if (document.querySelector('#rounded-toggle').checked) {
        document
          .querySelector('.main-container')
          .classList.add('outline-rounded');
      } else {
        document
          .querySelector('.main-container')
          .classList.add('outline-sharp');
      }
    } else {
      document.querySelector('.main-container').classList.add('filled');
      if (document.querySelector('#rounded-toggle').checked) {
        document
          .querySelector('.main-container')
          .classList.add('filled-rounded');
      } else {
        document.querySelector('.main-container').classList.add('filled-sharp');
      }
    }
  });

  //   window.patron.toggle('.outline-toggle', {
  //     onChange: e => {
  //       console.log('e');
  //     }
  //   });

  //   window.patron.toggle('.rounded-toggle', {
  //     onChange: e => {
  //       console.log('e');
  //     }
  //   });

  const routerArray = [];
  sidebarItems.default.map(item => {
    routerArray.push(new Route(item.link, item.default));
  });
  // eslint-disable-next-line no-new
  new Router(routerArray);
};
loadData();
