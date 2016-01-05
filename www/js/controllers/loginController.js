/* global angular */
(function () {
  function loginController ($scope, $state, dataService, sessionService) {
    $scope.loginForm = {}
    $scope.loginForm.data = {}
    $scope.loginForm.errors = {}

    $scope.onUsernameChange = function () {
      // Remove validation errors if the user starts changing data
      $scope.loginForm.errors.username = null
    }

    $scope.onPasswordChange = function () {
      // Remove validation errors if the user starts changing data
      $scope.loginForm.errors.password = null
    }

    $scope.onSubmit = function () {
      if ($scope.loginForm.data.username == null) {
        $scope.loginForm.errors.username = 'A username is required.'
      }

      if ($scope.loginForm.data.password == null) {
        $scope.loginForm.errors.password = 'A password is required.'
      }

      if ($scope.loginForm.data.username == null || $scope.loginForm.data.password == null) {
        return
      }

      dataService.authenticateUser($scope.loginForm.data.username, $scope.loginForm.data.password)
        .then(function (response) {
          sessionService.startSession(response.data, $scope.loginForm.data.username)
          $state.go('list')
        })
        .catch(function (error) {
          console.log(error)
          $scope.loginForm.errors.serverValidationError = 'Your username password combination is incorrect.'
        })
    }
  }

  angular.module('weebster').controller('loginController', ['$scope', '$state', 'dataService', 'sessionService', loginController])
})()
