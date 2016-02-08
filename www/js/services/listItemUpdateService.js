'use strict';

/* globals angular */
(function () {
  angular.module('weebster').service('listItemUpdateService', [function () {
    var observers = [];

    /**
     * Subscribes to list item updates.
     * @param  {function} callbackFn The function that will be called when a
     *                               list item is updated.
     */
    this.subscribe = function (callbackFn) {
      observers.push(callbackFn);
    };

    /**
     * Updates a list item.
     * @param  {object} listItem The updated list item.
     */
    this.update = function (listItem) {
      observers.forEach(function (callbackFn) {
        return callbackFn(listItem);
      });
    };
  }]);
})();