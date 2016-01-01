/* global angular */
(function () {
  function loginController ($scope, $http, $state, sessionService) {
    if(sessionService.hasSession()) {
      $state.go('list')
    }

    $scope.form = {}

    $scope.onSubmit = function () {
      if ($scope.form.username == null || $scope.form.password == null) {
        // TODO: Real validation.
      }

      $http.post('https://weebster-server.herokuapp.com/authenticate', {
        username: $scope.form.username,
        password: $scope.form.password
      })
      .then(function (response) {
        sessionService.startSession(response.data, $scope.form.username)
        $state.go('list')
      })
      .catch(function () {
        console.log('Auth failed')
      })
    }
  }

  angular.module('weebster').controller('loginController', ['$scope', '$http', '$state', 'sessionService', loginController])
})()
