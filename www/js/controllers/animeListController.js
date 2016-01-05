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

    function showLoadingIndicator () {
      $ionicLoading.show({
        template: '<p>Loading...</p><ion-spinner></ion-spinner>'
      })
    }

    function hideLoadingIndicator () {
      $ionicLoading.hide()
    }

    // Initialization
    showLoadingIndicator()

    dataService.getUserLibrary(sessionService.getUsername(), $scope.selected.libraryState.id)
      .then(function (response) {
        $scope.libraryEntries = response.data
      })
      .catch(function (error) {
        console.log(error)
      })
      .finally(hideLoadingIndicator)

    $scope.onSelectedLibraryStateChanged = function () {
      showLoadingIndicator()

      dataService.getUserLibrary(sessionService.getUsername(), $scope.selected.libraryState.id)
        .then(function (response) {
          $scope.libraryEntries = response.data
        })
        .catch(function (error) {
          console.log(error)
        })
        .finally(hideLoadingIndicator)
    }

    $scope.incrementWatched = function (animeId) {
      showLoadingIndicator()

      dataService.incrementEpisodesWatched(animeId)
        .then(function () {
          dataService.getUserLibrary(sessionService.getUsername(), $scope.selected.libraryState.id)
            .then(function (response) {
              $scope.libraryEntries = response.data
            })
            .catch(function (error) {
              console.log(error)
            })
            .finally(hideLoadingIndicator)
        })
    }
  }

  angular.module('weebster').controller('animeListController', ['$scope', '$state', '$ionicLoading', 'dataService', 'sessionService', animeListController])
})()
