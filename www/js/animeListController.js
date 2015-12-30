/* globals angular */
(function () {
  function animeListController ($scope, $http) {
    $http.get('https://weebster-server.herokuapp.com/users/coltex/library')
      .then(function (response) {
        $scope.libraryEntries = response.data
      })
      .catch(function (error) {
        console.log(error)
      })

    $scope.onRefresh = function () {
      $http.get('https://weebster-server.herokuapp.com/users/coltex/library')
        .then(function (response) {
          $scope.libraryEntries = response.data
        })
        .catch(function (error) {
          console.log(error)
        })
    }

    $scope.incrementWatched = function (animeId) {
      $http.post('https://weebster-server.herokuapp.com/libraryEntry/' + animeId, {
        auth_token: '',
        increment_episodes: true
      })
    }
  }

  angular.module('weebster').controller('animeListController', ['$scope', '$http', animeListController])
})()
