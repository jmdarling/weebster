'use strict';

/* globals angular */
(function () {
  angular.module('weebster').controller('animeDetailController', ['$scope', '$stateParams', '$ionicPopup', 'dataService', function ($scope, $stateParams, $ionicPopup, dataService) {
    // Initialization //
    $scope.libraryEntry = $stateParams.libraryEntry;

    $scope.incrementWatchCount = function () {
      dataService.incrementEpisodesWatched($scope.libraryEntry.anime.id).then(function (response) {
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