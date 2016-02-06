/* globals angular */
(() => {
  angular.module('weebster').controller('animeDetailController', ['$scope', '$stateParams', '$ionicPopup', 'dataService', ($scope, $stateParams, $ionicPopup, dataService) => {
    // Initialization //
    $scope.libraryEntry = $stateParams.libraryEntry

    $scope.incrementWatchCount = () => {
      dataService.incrementEpisodesWatched($scope.libraryEntry.anime.id)
        .then((response) => {
          $scope.libraryEntry.episodes_watched += 1
        })
        .catch(() => {
          $ionicPopup.alert({
            title: 'Update Error',
            template: 'There was a problem updating this anime, please try again later.'
          })
        })
    }
  }])
})()
