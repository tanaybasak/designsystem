import '../../../scss/base.scss';
import '../../../scss/components/password/password.scss';
import Password from '../../../js/password';

const ComponentList = {
  password: Password
};

for (const componentName in ComponentList) {
  if (Object.prototype.hasOwnProperty.call(ComponentList, componentName)) {
    const component = ComponentList[componentName];
    if (typeof component.handleDataAPI === 'function') {
      component.handleDataAPI();
    }
  }
}
