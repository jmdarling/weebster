'use strict';

/* global angular */
(function () {
  function sessionService() {
    var authenticationTokenKey = 'auth';
    var usernameKey = 'username';

    /**
     * Returns whether or not the user has a session.
     *
     * @return {Boolean} True if the user has a session, false otherwise.
     */
    this.hasSession = function () {
      var hasAuthenticationToken = window.localStorage.getItem(authenticationTokenKey) != null;
      var hasUsername = window.localStorage.getItem(usernameKey) != null;

      return hasAuthenticationToken && hasUsername;
    };

    /**
     * Starts the user's session.
     *
     * @param  {string} authenticationToken The user's authentication token.
     * @param  {string} username            The user's username.
     */
    this.startSession = function (authenticationToken, username) {
      window.localStorage.setItem(authenticationTokenKey, authenticationToken);
      window.localStorage.setItem(usernameKey, username);
    };

    /**
     * Ends the user's session.
     */
    this.endSession = function () {
      window.localStorage.removeItem(authenticationTokenKey);
    };

    /**
     * Returns the user's authentication token.
     *
     * @return {string} The user's authentication token.
     */
    this.getAuthenticationToken = function () {
      return window.localStorage.getItem(authenticationTokenKey);
    };

    /**
     * Returns the user's username.
     *
     * @return {string} The user's username.
     */
    this.getUsername = function () {
      return window.localStorage.getItem(usernameKey);
    };
  }

  angular.module('weebster').service('sessionService', [sessionService]);
})();