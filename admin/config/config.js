import defaultSettings from './defaultSettings'; // https://umijs.org/config/

import slash from 'slash2';
import webpackPlugin from './plugin.config';
const { pwa, primaryColor } = defaultSettings; // preview.pro.ant.design only do not use in your production ;
// preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。

const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION } = process.env;
const isAntDesignProPreview = ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site';
const plugins = [
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: {
        hmr: true,
      },
      locale: {
        // default false
        enable: true,
        // default zh-CN
        default: 'zh-CN',
        // default true, when it is true, will use `navigator.language` overwrite default
        baseNavigator: true,
      },
      dynamicImport: {
        loadingComponent: './components/PageLoading/index',
        webpackChunkName: true,
        level: 3,
      },
      pwa: pwa
        ? {
            workboxPluginMode: 'InjectManifest',
            workboxOptions: {
              importWorkboxFrom: 'local',
            },
          }
        : false, // default close dll, because issue https://github.com/ant-design/ant-design-pro/issues/4665
      // dll features https://webpack.js.org/plugins/dll-plugin/
      // dll: {
      //   include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch'],
      //   exclude: ['@babel/runtime', 'netlify-lambda'],
      // },
    },
  ],
  [
    'umi-plugin-pro-block',
    {
      moveMock: false,
      moveService: false,
      modifyRequest: true,
      autoAddMenu: true,
    },
  ],
]; // 针对 preview.pro.ant.design 的 GA 统计代码

if (isAntDesignProPreview) {
  plugins.push([
    'umi-plugin-ga',
    {
      code: 'UA-72788897-6',
    },
  ]);
  plugins.push([
    'umi-plugin-pro',
    {
      serverUrl: 'https://ant-design-pro.netlify.com',
    },
  ]);
}

export default {
  plugins,
  block: {
    defaultGitUrl: 'https://github.com/ant-design/pro-blocks',
  },
  hash: true,
  targets: {
    ie: 11,
  },
  devtool: isAntDesignProPreview ? 'source-map' : false,
  // umi routes: https://umijs.org/zh/guide/router.html
  routes: [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
        {
          name: 'register',
          path: '/user/register',
          component: './user/register',
        },
        {
          name: 'forgot',
          path: '/user/forgot',
          component: './user/forgot',
        },
      ],
    },
    {
      path: '/403',
      component: './403',
    },
    {
      path: '/404',
      component: './404',
    },
    {
      path: '/',
      component: '../layouts/BasicLayout',
      Routes: ['src/pages/Authorized'],
      authority: ['admin', 'user'],
      routes: [
        {
          path: '/',
          redirect: '/dashboard/workplace',
        },
        {
          name: 'dashboard.workplace',
          icon: 'home',
          path: '/dashboard/workplace',
          component: './dashboard/workplace',
        },
        {
          name: 'dashboard.analysis',
          icon: 'dashboard',
          path: '/dashboard/analysis',
          component: './dashboard/analysis',
        },
        {
          name: 'articles',
          icon: 'container',
          path: '/articles',
          routes: [
            {
              name: 'list',
              path: '/articles/list',
              component: './articles/list',
            },
            {
              path: '/articles/detail/:id',
              component: './articles/detail',
            },
            {
              path: '/articles/create',
              component: './articles/detail',
            },
            {
              name: 'category',
              path: '/articles/category',
              component: './articles/category',
            },
          ],
        },
        {
          name: 'investment-financing',
          icon: 'schedule',
          path: '/if',
          routes: [
            {
              name: 'projects',
              path: '/if/projects/list',
              component: './projects/list',
            },
            {
              path: '/if/projects/detail/:id',
              component: './projects/detail',
            },
            {
              path: '/if/projects/create',
              component: './projects/detail',
            },
            {
              name: 'capitals',
              path: '/if/capitals/list',
              component: './capitals/list',
            },
            {
              path: '/if/capitals/detail/:id',
              component: './capitals/detail',
            },
            {
              path: '/if/capitals/create',
              component: './capitals/detail',
            },
          ],
        },
        {
          name: 'providers',
          icon: 'audit',
          path: '/providers',
          routes: [
            {
              name: 'list',
              path: '/providers/list',
              component: './providers/list',
            },
            {
              path: '/providers/detail/:id',
              component: './providers/detail',
            },
            {
              path: '/providers/create',
              component: './providers/detail',
            },
            {
              name: 'category',
              path: '/providers/category',
              component: './providers/category',
            },
          ],
        },
        {
          name: 'products',
          icon: 'book',
          path: '/products',
          routes: [
            {
              name: 'list',
              path: '/products/list',
              component: './products/list',
            },
            {
              path: '/products/detail/:id',
              component: './products/detail',
            },
            {
              path: '/products/create',
              component: './products/detail',
            },
            {
              name: 'category',
              path: '/products/category',
              component: './products/category',
            },
          ],
        },
        {
          name: 'org',
          icon: 'apartment',
          path: '/org',
          component: './org',
        },
        {
          name: 'users',
          icon: 'team',
          path: '/users',
          routes: [
            {
              name: 'list',
              path: '/users/list',
              component: './users/list',
            },
            {
              path: '/users/detail/:id',
              component: './users/detail',
            },
            {
              path: '/users/create',
              component: './users/detail',
            },
          ],
        },
        {
          name: 'metadata',
          icon: 'database',
          path: '/metadata',
          component: './metadata',
        },
        {
          name: 'settings',
          icon: 'setting',
          path: '/settings',
          component: './settings',
        },
      ],
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': primaryColor,
  },
  define: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION:
      ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION || '', // preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (context, _, localName) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName;
      }

      const match = context.resourcePath.match(/src(.*)/);

      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = slash(antdProPath)
          .split('/')
          .map(a => a.replace(/([A-Z])/g, '-$1'))
          .map(a => a.toLowerCase());
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }

      return localName;
    },
  },
  manifest: {
    basePath: '/',
  },
  chainWebpack: webpackPlugin,
  /*
  proxy: {
    '/server/api/': {
      target: 'https://preview.pro.ant.design/',
      changeOrigin: true,
      pathRewrite: { '^/server': '' },
    },
  },
  */
};
