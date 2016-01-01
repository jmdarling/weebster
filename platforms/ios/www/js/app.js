/* globals angular */
var app = angular.module('weebster', ['ionic'])

app.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('list', {
      url: '/list',
      templateUrl: 'templates/list.html'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html'
    })

  $urlRouterProvider.otherwise('/list')
})

app.run(function ($ionicPlatform, $rootScope, $state, sessionService) {
  // Ionic bootstrapping
  $ionicPlatform.ready(function () {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      window.cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true)

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      window.cordova.plugins.Keyboard.disableScroll(true)
    }
    if (window.StatusBar) {
      window.StatusBar.styleDefault()
    }
  })

  // Authorization
  $rootScope.$on('$stateChangeStart', function (event, toState) {
    // Handle login redirect
    if (toState.url === '/login') {
      if (sessionService.hasSession()) {
        event.preventDefault()
        $state.go('list')
      } else {
        return
      }
    }

    // Handle all other redirects
    if (sessionService.hasSession()) {
      return
    }

    event.preventDefault()
    $state.go('login')
  })
})
