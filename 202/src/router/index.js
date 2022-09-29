import Vue from 'vue';
import VueRouter from 'vue-router';

let routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push (location) {
  return routerPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter);

export default new VueRouter({
  mode: 'hash',
  routes: [{
    path: '/',
    name: 'index',
    component: () => import('@/views/index/Index'),
  }, {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/Login'),
  }, {
    path: '/system',
    name: 'system',
    component: () => import('@/views/system/System'),
    redirect: "/system/run",
    children: [{
        path: 'run',
        name: 'run',
        component: () => import('@/views/system/run/Run'),
      }, {
        path: 'protocols',
        name: 'protocols',
        component: () => import('@/views/system/protocols/Protocols'),
      }, {
        path: 'clear',
        name: 'clear',
        component: () => import('@/views/system/clear/Clear'),
      }, {
        path: 'hepaFilter',
        name: 'hepaFilter',
        component: () => import('@/views/system/clear/HepaFilter'),
      },
      {
        path: 'list',
        name: 'list',
        component: () => import('@/views/system/run/List'),
      },
      {
        path: 'setting',
        name: 'setting',
        component: () => import('@/views/system/setting/Setting'),
      }, {
        path: 'loT',
        name: 'loT',
        component: () => import('@/views/system/loT/LoT'),
      }
    ]
  }, {
    path: '/system/user',
    name: 'user',
    component: () => import('@/views/system/user/User'),
    redirect: '/system/user/password',
    children: [{
      path: 'password',
      name: 'password',
      component: () => import('@/views/system/user/password/Password'),
    }, {
      path: 'manage',
      name: 'manage',
      component: () => import('@/views/system/user/manage/Manage'),
    }]
  }, {
    path: '/system/setting/settingShow',
    name: 'settingShow',
    component: () => import('@/views/system/setting/SettingShow'),
    // redirect: "/system/setting/settingShow/settingSystem",
    children: [{
      path: 'settingSystem',
      name: 'settingSystem',
      component: () => import('@/views/system/setting/settingOption/SettingSystem'),
    },{
      path: 'instrument',
      name: 'instrument',
      component: () => import('@/views/system/setting/settingOption/SettingInstrument'),
    },{
      path: 'settingTools',
      name: 'settingTools',
      component: () => import('@/views/system/setting/settingOption/SettingTools'),
    },{
      path: 'maintenance',
      name: 'maintenance',
      component: () => import('@/views/system/setting/settingOption/SettingMaintence'),
    }]
    }, {
      path: '/system/run/protocols',
      name: 'runProtocols',
      component: () => import('@/views/system/run//runProtocols')
  }]
})
