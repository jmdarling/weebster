/* globals angular */
(function () {
  function animeListController ($scope, $state, $ionicLoading, $ionicModal, dataService, sessionService) {
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

    $ionicModal.fromTemplateUrl('libraryEntryModel.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modal = modal
    })

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

    $scope.onLibraryEntryClicked = function (libraryEntry) {
      $scope.selected.libraryEntry = libraryEntry
      $scope.modal.show()
    }
  }

  angular.module('weebster').controller('animeListController', ['$scope', '$state', '$ionicLoading', '$ionicModal', 'dataService', 'sessionService', animeListController])
})()
