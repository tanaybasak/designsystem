import '../../../scss/components/pagination/_pagination.scss';
import Pagination from '../../../js/pagination';

const ComponentList = {
  pagination: Pagination
};

for (const componentName in ComponentList) {
  if (Object.prototype.hasOwnProperty.call(ComponentList, componentName)) {
    const component = ComponentList[componentName];
    if (typeof component.handleDataAPI === 'function') {
      component.handleDataAPI();
    }
  }
}