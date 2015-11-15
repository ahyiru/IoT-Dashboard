'use strict';

/**
 * Config for the router
 */
angular.module('app')
  .run(function ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
  })
  .config(function ($stateProvider, $urlRouterProvider, JQ_CONFIG, MODULE_CONFIG) {
    var layout = 'tpl/app.html';
    if (window.location.href.indexOf('material') > 0) {
      layout = 'tpl/blocks/material.layout.html';
      $urlRouterProvider
        .otherwise('/app/dashboard-v1');
    } else {
      $urlRouterProvider
        .otherwise('/profile');
    }

    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'tpl/page_signin.html',
        controller: 'SigninFormController',
        resolve: {
          skipIfLoggedIn: skipIfLoggedIn
        }
      })
      .state('logout', {
        url: '/logout',
        controller: 'LogoutController',
        resolve: load(['js/controllers/logout.js'])
      })

      .state('signup', {
        url: '/signup',
        templateUrl: 'tpl/page_signup.html',
        controller: 'SignupFormController',
        resolve: load(['js/controllers/signup.js'])
      })

      .state('app', {
        abstract: true,
        url: '/',
        templateUrl: layout,
        resolve: {
          loginRequired: loginRequired
        }
      })
      .state('app.profile', {
        url: 'profile',
        templateUrl: 'tpl/profile.html',
        resolve: load([
          'js/services/account.js',
          'js/controllers/profile.js'
        ])
      })

      .state('app.devices', {
        url: 'devices',
        templateUrl: 'tpl/devices.html',
        resolve: load([
          'js/services/account.js',
          'js/controllers/devices.js'
        ])
      })

      .state('layout', {
        abstract: true,
        url: '/layout',
        templateUrl: 'tpl/layout.html'
      })
      .state('layout.fullwidth', {
        url: '/fullwidth',
        views: {
          '': {
            templateUrl: 'tpl/layout_fullwidth.html'
          },
          'footer': {
            templateUrl: 'tpl/layout_footer_fullwidth.html'
          }
        },
        resolve: load(['js/controllers/vectormap.js'])
      })
      .state('layout.mobile', {
        url: '/mobile',
        views: {
          '': {
            templateUrl: 'tpl/layout_mobile.html'
          },
          'footer': {
            templateUrl: 'tpl/layout_footer_mobile.html'
          }
        }
      })
      .state('layout.app', {
        url: '/app',
        views: {
          '': {
            templateUrl: 'tpl/layout_app.html'
          },
          'footer': {
            templateUrl: 'tpl/layout_footer_fullwidth.html'
          }
        },
        resolve: load(['js/controllers/tab.js'])
      })
      .state('music', {
        url: '/music',
        templateUrl: 'tpl/music.html',
        controller: 'MusicCtrl',
        resolve: load([
          'com.2fdevs.videogular',
          'com.2fdevs.videogular.plugins.controls',
          'com.2fdevs.videogular.plugins.overlayplay',
          'com.2fdevs.videogular.plugins.poster',
          'com.2fdevs.videogular.plugins.buffering',
          'js/app/music/ctrl.js',
          'js/app/music/theme.css'
        ])
      })
      .state('music.artists', {
        url: '/artists',
        templateUrl: 'tpl/music.artists.html'
      })
      .state('music.home', {
        url: '/home',
        templateUrl: 'tpl/music.home.html'
      })
      .state('music.genres', {
        url: '/albums',
        templateUrl: 'tpl/music.genres.html'
      })
      .state('music.artists.albums', {
        url: '/lookalbums/{id}',
        templateUrl: 'tpl/music.artists.albums.html'
      })
      .state('music.detail', {
        url: '/detail/{id}',
        templateUrl: 'tpl/music.detail.html'
      })
      .state('music.mtv', {
        url: '/lookartist/{id}',
        templateUrl: 'tpl/music.artists.albums.html'
      })
      .state('music.mtvdetail', {
        url: '/mtvdetail',
        templateUrl: 'tpl/music.mtv.detail.html'
      })
      .state('music.playlist', {
        url: '/playlist/{fold}',
        templateUrl: 'tpl/music.playlist.html'
      })
      .state('app.material', {
        url: '/material',
        template: '<div ui-view class="wrapper-md"></div>',
        resolve: load(['js/controllers/material.js'])
      });

    function load(srcs, callback) {
      return {
        deps: ['$ocLazyLoad', '$q',
          function ($ocLazyLoad, $q) {
            var deferred = $q.defer();
            var promise = false;
            srcs = angular.isArray(srcs) ? srcs : srcs.split(/\s+/);
            if (!promise) {
              promise = deferred.promise;
            }
            angular.forEach(srcs, function (src) {
              promise = promise.then(function () {
                if (JQ_CONFIG[src]) {
                  return $ocLazyLoad.load(JQ_CONFIG[src]);
                }
                angular.forEach(MODULE_CONFIG, function (module) {
                  if (module.name == src) {
                    name = module.name;
                  } else {
                    name = src;
                  }
                });
                return $ocLazyLoad.load(name);
              });
            });
            deferred.resolve();
            return callback ? promise.then(function () {
              return callback();
            }) : promise;
          }]
      }
    }

    function skipIfLoggedIn($q, $auth) {
      var deferred = $q.defer();
      if ($auth.isAuthenticated()) {
        deferred.reject();
      } else {
        deferred.resolve();
      }
      return deferred.promise;
    }

    function loginRequired($q, $location, $auth) {
      var deferred = $q.defer();
      if ($auth.isAuthenticated()) {
        deferred.resolve();
      } else {
        $location.path('/login');
      }
      return deferred.promise;
    }
  });
