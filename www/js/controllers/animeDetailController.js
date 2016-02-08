'use strict';

/* globals angular */
(function () {
  angular.module('weebster').controller('animeDetailController', ['$scope', '$stateParams', '$ionicPopup', 'dataService', 'listItemUpdateService', function ($scope, $stateParams, $ionicPopup, dataService, listItemUpdateService) {
    // Initialization //
    $scope.libraryEntry = $stateParams.libraryEntry;

    $scope.incrementWatchCount = function () {
      dataService.incrementEpisodesWatched($scope.libraryEntry.anime.id).then(function (response) {
        listItemUpdateService.update($scope.libraryEntry);
        $scope.libraryEntry.episodes_watched += 1;
      }).catch(function () {
        $ionicPopup.alert({
          title: 'Update Error',
          template: 'There was a problem updating this anime, please try again later.'
        });
      });
    };
  }]);
})();