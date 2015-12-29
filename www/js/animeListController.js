(function() {
  function animeListController($scope, $http) {
    $http.get('http://localhost:3000/users/coltex/library')
      .then(function(response) {
        $scope.libraryEntries = response.data;
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  angular.module('weebster').controller('animeListController', ['$scope', '$http', animeListController]);
})();
