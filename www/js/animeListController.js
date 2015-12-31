/* globals angular */
(function () {
  function animeListController ($scope, $http, $state, sessionService) {
    if (!sessionService.hasSession()) {
      $state.go('login')
    }

    $http.get('https://weebster-server.herokuapp.com/users/' + sessionService.getUsername() + '/library')
      .then(function (response) {
        $scope.libraryEntries = response.data
      })
      .catch(function (error) {
        console.log(error)
      })

    $scope.onRefresh = function () {
      $http.get('https://weebster-server.herokuapp.com/users/' + sessionService.getUsername() + '/library')
        .then(function (response) {
          $scope.libraryEntries = response.data
        })
        .catch(function (error) {
          console.log(error)
        })
    }

    $scope.incrementWatched = function (animeId) {
      $http.post('https://weebster-server.herokuapp.com/libraryEntry/' + animeId, {
        auth_token: sessionService.getAuthenticationToken(),
        increment_episodes: true
      })
    }
  }

  angular.module('weebster').controller('animeListController', ['$scope', '$http', '$state', 'sessionService', animeListController])
})()
