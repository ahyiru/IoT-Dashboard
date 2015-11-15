'use strict';

/* Controllers */

angular.module('app')
  .controller('AppCtrl', function ($rootScope, $scope, $translate, $localStorage, $window, $auth, $location, $http, Account) {
    // add 'ie' classes to html
    var isIE = !!navigator.userAgent.match(/MSIE/i);
    isIE && angular.element($window.document.body).addClass('ie');
    isSmartDevice($window) && angular.element($window.document.body).addClass('smart');

    // config
    $scope.app = {
      name: 'dashboard',
      version: '0.0.1',
      // for chart colors
      color: {
        primary: '#7266ba',
        info: '#23b7e5',
        success: '#27c24c',
        warning: '#fad733',
        danger: '#f05050',
        light: '#e8eff0',
        dark: '#3a3f51',
        black: '#1c2b36'
      },
      settings: {
        themeID: 1,
        navbarHeaderColor: 'bg-head',// 'bg-white-only',
        navbarCollapseColor: 'bg-white-only',
        asideColor: 'bg-black',
        headerFixed: true,
        asideFixed: true,
        asideFolded: false,
        asideDock: false,
        container: false
      }
    };
    $scope.button = true;


    // save settings to local storage
    //if (angular.isDefined($localStorage.settings)) {
    //  $scope.app.settings = $localStorage.settings;
    //} else {
    //  $localStorage.settings = $scope.app.settings;
    //}
    $scope.$watch('app.settings', function () {
      if ($scope.app.settings.asideDock && $scope.app.settings.asideFixed) {
        // aside dock and fixed must set the header fixed.
        $scope.app.settings.headerFixed = true;
      }
      // for box layout, add background image
      $scope.app.settings.container ? angular.element('html').addClass('bg') : angular.element('html').removeClass('bg');
      // save to local storage
      //$localStorage.settings = $scope.app.settings;
    }, true);

    // angular translate
    $scope.lang = {isopen: false};
    $scope.langs = {en: 'English', de_DE: 'German', it_IT: 'Italian'};
    $scope.selectLang = $scope.langs[$translate.proposedLanguage()] || "English";
    $scope.setLang = function (langKey, $event) {
      // set the current lang
      $scope.selectLang = $scope.langs[langKey];
      // You can change the language during runtime
      $translate.use(langKey);
      $scope.lang.isopen = !$scope.lang.isopen;
    };

    function isSmartDevice($window) {
      // Adapted from http://www.detectmobilebrowsers.com
      var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
      // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
      return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
    }

    // 注销
    $scope.logout=function(){
      $auth.logout();
      $location.path('/login');
    };

    ($rootScope.refreshAllAccountInfo = function () {
      var tuser,tdev;
      ($rootScope.refreshDevicesList = function () {
        clearTimeout(tuser);
        if ($auth.isAuthenticated()){
          Account.devices(function (devices) {
            //if (devices.authorizedDevices.length == 0){
            //  devices.authorizedDevices = demoDevices;
            //}
            $rootScope.devices = devices;
            $rootScope.devices.devicesQuota = $rootScope.devices.devicesQuota || 1;
            $rootScope.availableDeviceSlots = new Array($rootScope.devices.devicesQuota - ($rootScope.devices.authorizedDevices ? $rootScope.devices.authorizedDevices.length : 0));
            console.log('devices', devices);
            tuser = setTimeout(function () {
              $rootScope.refreshDevicesList();
            }, 15000);
          });
        }
      })();

      ($rootScope.refreshAccountInfo = function () {
        clearTimeout(tdev);
        if ($auth.isAuthenticated()){
          Account.info(function (account) {
            $rootScope.account = account;
            console.log('account', account);
            $rootScope.account.subscription = {};
            switch (true) {
              case (account.accountType == 1 && account.devicesQuota == 5):
                $rootScope.account.subscription.typeDescription = '$4.99/month';
                break;

              case (account.accountType == 1 && account.devicesQuota == 10):
                $rootScope.account.subscription.typeDescription = '$9.99/month';
                break;

              default:
                $rootScope.account.subscription.typeDescription = 'Free';
            }
            tdev = setTimeout(function () {
              $rootScope.refreshAccountInfo();
            }, 60000);
          });
        }
      })();

      $rootScope.upgradeAccount = function () {
        Account.upgrade(function (response) {
          console.log('Account upgrade response', response);
          $rootScope.refreshAccountInfo();
          $rootScope.refreshDevicesList();
        });
      };
      
    })();

  });
