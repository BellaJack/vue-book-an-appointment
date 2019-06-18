import Archive from './views/BoutiquesArchive.vue';
import Selector from './views/BoutiqueSelector.vue';

export const routes = [
  {
    path: '/',
    component: Selector
  },
  {
    path: '/archive',
    component: Archive
  }
];