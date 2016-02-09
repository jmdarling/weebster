/* globals angular */
(() => {
  angular.module('weebster').controller('animeDetailController', ['$scope', '$stateParams', '$ionicPopup', '$ionicLoading', 'dataService', 'listItemUpdateService', ($scope, $stateParams, $ionicPopup, $ionicLoading, dataService, listItemUpdateService) => {
    // Initialization //
    $scope.libraryEntry = $stateParams.libraryEntry

    function showLoadingIndicator () {
      $ionicLoading.show({
        template: '<ion-spinner></ion-spinner>'
      })
    }

    function hideLoadingIndicator () {
      $ionicLoading.hide()
    }

    $scope.incrementWatchCount = () => {
      showLoadingIndicator()

      dataService.incrementEpisodesWatched($scope.libraryEntry.anime.id)
        .then((response) => {
          listItemUpdateService.update($scope.libraryEntry)
          $scope.libraryEntry.episodes_watched += 1
        })
        .catch(() => {
          $ionicPopup.alert({
            title: 'Update Error',
            template: 'There was a problem updating this anime, please try again later.'
          })
        })
        .finally(hideLoadingIndicator)
    }

    $scope.buildRatingStarsArray = rating => {
      let starsArray = []

      let fullStars = Math.floor(rating)
      let hasHalfStar = (rating % 1) > 0.25

      let iteration = 0

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
  }])
})()
