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
        // TODO: Return a failure using $q
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
        // TODO: Return a failure using $q
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
        // TODO: Return a failure using $q.
      }

      var uri = uriBase + 'libraryEntry'

      var body = {
        auth_token: sessionService.getAuthenticationToken()
        animeId: animeId
      }

      return $http.post(uri, body)
    }

  }

  angular.module('weebster').service('dataService', ['$http', '$q', 'sessionService', dataService])
})()
