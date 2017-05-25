import { COMPONENTS } from './components';

COMPONENTS.forEach(c => {
  Vue.component(c.name, c);
});

