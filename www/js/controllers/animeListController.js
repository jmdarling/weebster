/* globals angular */
(function () {
  function animeListController ($scope, $state, $ionicLoading, dataService, sessionService) {
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
      $ionicLoading.show({
        template: '<p>Loading...</p><ion-spinner></ion-spinner>'
      })

      dataService.getUserLibrary(sessionService.getUsername(), $scope.selected.libraryState.id)
        .then(function (response) {
          $scope.libraryEntries = response.data
          $ionicLoading.hide()
        })
        .catch(function (error) {
          console.log(error)
          $ionicLoading.hide()
        })
    }

    $ionicLoading.show({
      template: '<p>Loading...</p><ion-spinner></ion-spinner>'
    })

    dataService.getUserLibrary(sessionService.getUsername(), $scope.selected.libraryState.id)
      .then(function (response) {
        $scope.libraryEntries = response.data
        $ionicLoading.hide()
      })
      .catch(function (error) {
        console.log(error)
        $ionicLoading.hide()
      })

    $scope.incrementWatched = function (animeId) {
      dataService.incrementEpisodesWatched(animeId)
    }
  }

  angular.module('weebster').controller('animeListController', ['$scope', '$state', '$ionicLoading', 'dataService', 'sessionService', animeListController])
})()
