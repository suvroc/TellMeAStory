﻿// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter',
    ['ionic', 'starter.controllers', 'random.services', 'LocalStorageModule','ngAnimate'])

.run(/* @ngInject */ function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        //if (window.cordova && window.cordova.plugins.Keyboard) {
        //    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        //    cordova.plugins.Keyboard.disableScroll(true);

        //}
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(/* @ngInject */ function ($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('app', {
          url: '/app',
          abstract: true,
          templateUrl: 'templates/menu.html',
          controller: 'AppCtrl'
      })

    .state('app.random', {
        url: '/random',
        views: {
            'menuContent': {
                templateUrl: 'templates/random.html',
                controller: "RandomCtrl"
            }
        }
    })
    .state('app.randomParam', {
        url: '/random/:setId',
        views: {
            'menuContent': {
                templateUrl: 'templates/random.html',
                controller: "RandomCtrl"
            }
        }
    })
    .state('app.scenarios', {
        url: '/scenarios',
        views: {
            'menuContent': {
                templateUrl: 'templates/scenarios.html',
                controller: "ScenariosCtrl"
            }
        }
    })
      .state('app.options', {
          url: '/options',
          views: {
              'menuContent': {
                  templateUrl: 'templates/options.html',
                  controller: 'OptionsCtrl'
              }
          }
      })

    .state('app.info', {
        url: '/info',
        views: {
            'menuContent': {
                templateUrl: 'templates/info.html',
                controller: 'InfoCtrl'
            }
        }
    })
    .state('app.monomit', {
        url: '/scenarios/monomit',
        views: {
            'menuContent': {
                templateUrl: 'templates/scenarios-monomit.html',
                controller: 'MonomitCtrl'
            }
        }
    })
    .state('app.monomitParam', {
        url: '/scenarios/monomit/:setId',
        views: {
            'menuContent': {
                templateUrl: 'templates/scenarios-monomit.html',
                controller: 'MonomitCtrl'
            }
        }
    })
    .state('app.load', {
        url: '/load',
        views: {
            'menuContent': {
                templateUrl: 'templates/load.html',
                controller: 'LoadCtrl'
            }
        }
    })
    .state('app.loadScen', {
        url: '/load/:scenarioName',
        views: {
            'menuContent': {
                templateUrl: 'templates/loadScenario.html',
                controller: 'LoadScenarioCtrl'
            }
        }
    });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/random');
});
