/* global angular */
(function () {
  function loginController ($scope, $state, $ionicLoading, dataService, sessionService) {
    $scope.loginForm = {}
    $scope.loginForm.data = {}
    $scope.loginForm.errors = {}

    function showLoadingIndicator () {
      $ionicLoading.show({
        template: '<p>Loading...</p><ion-spinner></ion-spinner>'
      })
    }

    function hideLoadingIndicator () {
      $ionicLoading.hide()
    }

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

      showLoadingIndicator()

      dataService.authenticateUser($scope.loginForm.data.username, $scope.loginForm.data.password)
        .then(response => {
          sessionService.startSession(response.data, $scope.loginForm.data.username)
          $state.go('anime')
        })
        .catch(error => {
          console.log(error)
          $scope.loginForm.errors.serverValidationError = 'Your username password combination is incorrect.'
          $scope.loginForm.data.pasword = null
        })
        .finally(() => {
          hideLoadingIndicator()
        })
    }
  }

  angular.module('weebster').controller('loginController', ['$scope', '$state', '$ionicLoading', 'dataService', 'sessionService', loginController])
})()
