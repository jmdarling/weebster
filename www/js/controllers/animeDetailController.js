'use strict';

/* globals angular */
(function () {
  angular.module('weebster').controller('animeDetailController', ['$scope', '$stateParams', 'dataService', function ($scope, $stateParams, dataService) {
    // Initialization //
    $scope.libraryEntry = $stateParams.libraryEntry;
  }]);
})();