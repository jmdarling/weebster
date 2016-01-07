/* globals angular */
(function () {
  function dataService ($http, $q, sessionService) {
    var uriBase = 'https://weebster-server.herokuapp.com/'

    /**
     *  Attempts to authenticate a user.
     *
     *  @param username The user's username.
     *  @param password The user's password.
     */
    this.authenticateUser = function (username, password) {
      if (username == null || password == null) {
        return $q.reject('The parameters "username" and "password" must not be null.')
      }

      var uri = uriBase + 'authenticate'

      var body = {
        username: username,
        password: password
      }

      return $http.post(uri, body)
    }

    /**
     *  Fetches a user's library.
     *
     *  @param username The user whos library should be fetched.
     *  @param status   The anime status to retrieve (currently-watching,
     *                  completed, etc.)
     */
    this.getUserLibrary = function (username, status) {
      if (username == null) {
        return $q.reject('The parameter "username" must not be null.')
      }

      var uri = uriBase + 'users/' + username + '/library'

      if (status != null) {
        uri += '?status=' + status
      }

      return $http.get(uri)
    }

    /**
     *  Increments the episodes watched count for the provided anime. Requires
     *  the user to be authenticated.
     *
     *  @param animeId The anime to be incremented.
     */
    this.incrementEpisodesWatched = function (animeId) {
      if (animeId == null) {
        return $q.reject('The parameter "animeId" must not be null.')
      }

      if (!sessionService.hasSession()) {
        return $q.reject('The user must be logged in.')
      }

      var uri = uriBase + 'libraryEntry/' + animeId

      var body = {
        auth_token: sessionService.getAuthenticationToken(),
        increment_episodes: true
      }

      return $http.post(uri, body)
    }
  }

  angular.module('weebster').service('dataService', ['$http', '$q', 'sessionService', dataService])
})()
