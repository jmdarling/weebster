/* globals angular */
(function () {
  function animeListController ($scope, $http, $state, sessionService) {
    $scope.libraryStateOptions = [
      {
        id: 'all',
        name: 'All'
      },
      {
        id: 'currently-watching',
        name: 'Currently Watching'
      },
      {
        id: 'plan-to-watch',
        name: 'Plan to Watch'
      },
      {
        id: 'completed',
        name: 'Completed'
      },
      {
        id: 'on-hold',
        name: 'On Hold'
      },
      {
        id: 'dropped',
        name: 'Dropped'
      }
    ]

    $scope.selected = {}
    $scope.selected.libraryState = $scope.libraryStateOptions[1]

    $scope.onSelectedLibraryStateChanged = function () {
      $http.get('https://weebster-server.herokuapp.com/users/' + sessionService.getUsername() + '/library?status=' + $scope.selected.libraryState.id)
      .then(function (response) {
        $scope.libraryEntries = response.data
      })
      .catch(function (error) {
        console.log(error)
      })
    }

    $http.get('https://weebster-server.herokuapp.com/users/' + sessionService.getUsername() + '/library?status=' + $scope.selected.libraryState.id)
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
