import { COMPONENTS } from './components';
import { messageBox, ajax } from './utils';

COMPONENTS.forEach(c => {
  Vue.component(c.name, c);
});

window.AppTools = {
  messageBox,
  ajax
};
