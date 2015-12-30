/* global angular */
(function () {
  function sessionService () {
    var authenticationTokenKey = 'auth'

    this.hasSession = function () {
      return window.localStorage.getItem(authenticationTokenKey) != null
    }

    this.startSession = function (authenticationToken) {
      window.localStorage.setItem(authenticationTokenKey, authenticationToken)
    }

    this.endSession = function () {
      window.localStorage.removeItem(authenticationTokenKey)
    }

    this.getAuthenticationToken = function () {
      return window.localStorage.getItem(authenticationTokenKey)
    }
  }

  angular.module('weebster').service('sessionService', [sessionService])
})()
