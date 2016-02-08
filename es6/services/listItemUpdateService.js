/* globals angular */
(() => {
  angular.module('weebster').service('listItemUpdateService', [function () {
    let observers = []

    /**
     * Subscribes to list item updates.
     * @param  {function} callbackFn The function that will be called when a
     *                               list item is updated.
     */
    this.subscribe = (callbackFn) => {
      observers.push(callbackFn)
    }

    /**
     * Updates a list item.
     * @param  {object} listItem The updated list item.
     */
    this.update = (listItem) => {
      observers.forEach((callbackFn) => callbackFn(listItem))
    }
  }])
})()
