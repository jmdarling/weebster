(function() {
  function animeListController($scope, $http) {
    $http.get('https://weebster-server.herokuapp.com/users/coltex/library')
      .then(function(response) {
        $scope.libraryEntries = response.data;
      })
      .catch(function(error) {
        console.log(error);
      });

      $scope.onRefresh = function () {
        $http.get('https://weebster-server.herokuapp.com/users/coltex/library')
          .then(function(response) {
            $scope.libraryEntries = response.data;
          })
          .catch(function(error) {
            console.log(error);
          });
      }
  }

  angular.module('weebster').controller('animeListController', ['$scope', '$http', animeListController]);
})();
