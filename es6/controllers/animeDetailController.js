/* globals angular */
(() => {
  angular.module('weebster').controller('animeDetailController', ['$scope', '$stateParams', 'dataService', ($scope, $stateParams, dataService) => {
    // Initialization //
    $scope.libraryEntry = $stateParams.libraryEntry
  }])
})()
