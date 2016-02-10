'use strict';

/* globals angular */
(function () {
  angular.module('weebster').controller('animeDetailController', ['$scope', '$stateParams', '$ionicPopup', '$ionicLoading', 'dataService', 'listItemUpdateService', function ($scope, $stateParams, $ionicPopup, $ionicLoading, dataService, listItemUpdateService) {
    // Initialization //
    $scope.libraryEntry = $stateParams.libraryEntry;

    function showLoadingIndicator() {
      $ionicLoading.show({
        template: '<ion-spinner></ion-spinner>'
      });
    }

    function hideLoadingIndicator() {
      $ionicLoading.hide();
    }

    $scope.changeStatus = function () {
      showLoadingIndicator();

      dataService.changeStatus($scope.libraryEntry.anime.id, $scope.libraryEntry.status).then(function (response) {
        listItemUpdateService.update($scope.libraryEntry);
      }).catch(function (error) {
        console.log('Error occurred in $scope.changeStatus: ' + JSON.stringify(error));

        $ionicPopup.alert({
          title: 'Update Error',
          template: 'There was a problem updating this anime, please try again later.'
        });
      }).finally(hideLoadingIndicator);
    };

    $scope.incrementWatchCount = function () {
      showLoadingIndicator();

      dataService.incrementEpisodesWatched($scope.libraryEntry.anime.id).then(function (response) {
        listItemUpdateService.update($scope.libraryEntry);
        $scope.libraryEntry.episodes_watched += 1;
      }).catch(function (error) {
        console.log('Error occurred in $scope.incrementWatchCount: ' + JSON.stringify(error));

        $ionicPopup.alert({
          title: 'Update Error',
          template: 'There was a problem updating this anime, please try again later.'
        });
      }).finally(hideLoadingIndicator);
    };

    $scope.buildRatingStarsArray = function (rating) {
      var starsArray = [];

      var fullStars = Math.floor(rating);
      var hasHalfStar = rating % 1 > 0.25;

      var iteration = 0;

      while (iteration < fullStars) {
        starsArray[iteration] = 1;
        iteration += 1;
      }

      if (hasHalfStar) {
        starsArray[iteration] = 0.5;
        iteration += 1;
      }

      while (iteration < 5) {
        starsArray[iteration] = 0;
        iteration += 1;
      }

      return starsArray;
    };
  }]);
})();