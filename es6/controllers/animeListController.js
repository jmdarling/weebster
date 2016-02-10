/* globals angular */
(function () {
  function animeListController ($scope, $state, $ionicLoading, $ionicModal, dataService, sessionService, listItemUpdateService) {
    $scope.statusMap = {
      'currently-watching': 'Currently Watching',
      'plan-to-watch': 'Plan to Watch',
      'completed': 'Completed',
      'oh-hold': 'On Hold',
      'dropped': 'Dropped'
    }

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

    // Subscribe for external list item updates.
    listItemUpdateService.subscribe((listItem) => {
      let updatedIndex = $scope.libraryEntries.findIndex((element) => {
        return element.id === listItem.id
      })

      // If the status has changed, remove it from the current view.
      if (listItem.status !== $scope.selected.libraryState.id) {
        $scope.libraryEntries.splice(updatedIndex, 1)
      } else {
        $scope.libraryEntries[updatedIndex] = listItem
      }
    })

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

    $scope.onLibraryEntryClicked = function (libraryEntryIndex) {
      $state.go('animeDetail', {
        libraryEntry: $scope.libraryEntries[libraryEntryIndex]
      })
    }

    $scope.getRatingStarsArray = function (rating) {
      var starsArray = []

      var fullStars = Math.floor(rating)
      var hasHalfStar = (rating % 1) > 0.25

      var iteration = 0

      while (iteration < fullStars) {
        starsArray[iteration] = 1
        iteration += 1
      }

      if (hasHalfStar) {
        starsArray[iteration] = 0.5
        iteration += 1
      }

      while (iteration < 5) {
        starsArray[iteration] = 0
        iteration += 1
      }

      return starsArray
    }
  }

  angular.module('weebster').controller('animeListController', ['$scope', '$state', '$ionicLoading', '$ionicModal', 'dataService', 'sessionService', 'listItemUpdateService', animeListController])
})()
