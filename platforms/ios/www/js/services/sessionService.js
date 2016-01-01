/* global angular */
(function () {
  function sessionService () {
    var authenticationTokenKey = 'auth'
    var usernameKey = 'username'

    this.hasSession = function () {
      var hasAuthenticationToken = (window.localStorage.getItem(authenticationTokenKey) != null)
      var hasUsername = (window.localStorage.getItem(usernameKey) != null)

      return hasAuthenticationToken && hasUsername
    }

    this.startSession = function (authenticationToken, username) {
      window.localStorage.setItem(authenticationTokenKey, authenticationToken)
      window.localStorage.setItem(usernameKey, username)
    }

    this.endSession = function () {
      window.localStorage.removeItem(authenticationTokenKey)
    }

    this.getAuthenticationToken = function () {
      return window.localStorage.getItem(authenticationTokenKey)
    }

    this.getUsername = function () {
      return window.localStorage.getItem(usernameKey)
    }
  }

  angular.module('weebster').service('sessionService', [sessionService])
})()
