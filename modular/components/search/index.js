import '../../../scss/base.scss';
import '../../../scss/components/search/search.scss';
import Search from '../../../js/search';

const ComponentList = {
  search: Search
};

for (const componentName in ComponentList) {
  if (Object.prototype.hasOwnProperty.call(ComponentList, componentName)) {
    const component = ComponentList[componentName];
    if (typeof component.handleDataAPI === 'function') {
      component.handleDataAPI();
    }
  }
}
