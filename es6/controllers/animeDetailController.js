/* globals angular */
(() => {
  angular.module('weebster').controller('animeDetailController', ['$scope', '$stateParams', '$ionicPopup', 'dataService', 'listItemUpdateService', ($scope, $stateParams, $ionicPopup, dataService, listItemUpdateService) => {
    // Initialization //
    $scope.libraryEntry = $stateParams.libraryEntry

    $scope.incrementWatchCount = () => {
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
    }
  }])
})()
