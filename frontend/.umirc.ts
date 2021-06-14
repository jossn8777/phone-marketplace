import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  publicPath: '/public/',
  routes: [
    { path: '/', component: '@/pages/index' },
    { 
      path: '/phone',
      component: '@/layouts',
      routes: [
        { path: '/phone', component: '@/pages/phone'},
        { path: '/phone/create', component: '@/pages/phone/create' },
        { path: '/phone/detail', component: '@/pages/phone/detail'}
      ] 
    },
  ],
  fastRefresh: {},
  ssr: {},
  dva: {},
});
