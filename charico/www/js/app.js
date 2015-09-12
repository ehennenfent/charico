// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }

    Parse.initialize("g9Mqi6zsBoUTdGWHapYxOjpITKiP5ubfJSWRTAoZ", "vQR3lTkMgZyZDgQHv2xVO9tfGJXYgNI6oWqQVnMO");

    var TestObject = Parse.Object.extend("TestObject");
    var testObject = new TestObject();
    testObject.save({foo: "bar"}).then(function(object) {
      console.log("yay! it worked");
    });

    window.parsePlugin.initialize('g9Mqi6zsBoUTdGWHapYxOjpITKiP5ubfJSWRTAoZ', 'qQWC7kvvkSiYtBAqgw0FR6rRftAfFUyZRbnPwlsk', function() {
      console.log('Parse initialized successfully.');


      window.parsePlugin.subscribe('SampleChannel', function() {
        console.log('Successfully subscribed to SampleChannel.');


          window.parsePlugin.getInstallationId(function(id) {
            // update the view to show that we have the install ID
            console.log('Retrieved install id: ' + id);

              /**
               * Now you can construct an object and save it to your own services, or Parse, and corrilate users to parse installations
               *
               var install_data = {
                  installation_id: id,
                  channels: ['SampleChannel']
               }
               *
               */

          }, function(e) {
            console.log('Failure to retrieve install id.');
          });

      }, function(e) {
          console.log('Failed trying to subscribe to SampleChannel.');
      });

    }, function(e) {
        console.log('Failure to initialize Parse.');
    });

  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});
