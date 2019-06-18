import Archive from './views/BoutiquesArchive.vue';
import Selector from './views/BoutiqueSelector.vue';

export const routes = [{
    path: '/',
    name: 'selector',
    component: Selector
  },
  {
    path: '/archive',
    name: 'archive',
    component: Archive
  },
  {
    path: '/archive/:id',
    name: 'type',
    component: Archive
  }
];