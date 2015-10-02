const request = require('superagent');
const _ = require('lodash');
const _URL = "http://104.131.58.229:4000/api";
const Auth = require('../utils/auth');


/**
 * OBJECT FOR AJAX METHODS AND CONNECT WITH THE TRINITY API
 * *******************************************************
 * @type {Object}
 */
const API = {

  _REQUEST_METHOD: {
    get: "GET",
    post: "POST",
    delete: "DELETE",
    put: "PUT",
    patch: "PATCH"
  },

  getToken() {
    return Auth.getToken();
  },

  /**
   * AJAX METHODS WITH TOKEN AUTHENTICATION
   * **************************************
   * All methods receive route and callback, return into the
   * callback the error and the response
   */

    callAjaxGet(route, cb) {
    request.get(_URL + route)
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + this.getToken())
      .type('application/json')
      .end((err, res)=> {
        cb(err, res);
      });
  },

  callAjaxPost(route, data, cb) {
    request.post(_URL + route)
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + this.getToken())
      .type('application/json')
      .send(data)
      .end((err, res)=> {
        cb(err, res);
      });
  },

  callAjaxDelete(route, cb) {
    request.del(_URL + route)
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + this.getToken())
      .type('application/json')
      .end((err, res)=> {
        cb(err, res);
      });
  },

  callAjaxUpdate(route, data, cb) {
    request.put(_URL + route)
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + this.getToken())
      .type('application/json')
      .send(data)
      .end((err, res)=> {
        cb(err, res);
      });
  },

  _parseRoute(routeObject, data) {
    var route = routeObject.route;
    var simbols = route.match(/\:[^\/]+/g) || [];
    simbols.forEach(function (simbol) {
      var dataSimbol = simbol.substring(1); //Removes the ':' of the simbol
      route = route.replace(simbol, data[dataSimbol]);
    });
    return route;
  },

  callAjaxRequest(routeObject, data, cb) {
    var route = this._parseRoute(routeObject, data);
    switch (routeObject.method) {
      case this._REQUEST_METHOD.get:
        return this.callAjaxGet(route, cb);
      case this._REQUEST_METHOD.post:
        return this.callAjaxPost(route, data, cb);
      case this._REQUEST_METHOD.put:
        return this.callAjaxUpdate(route, data, cb);
      case this._REQUEST_METHOD.delete:
        return this.callAjaxDelete(route, cb);
      default:
        return null;
    }
  },

  /**
   * AJAX METHODS WITHOUT TOKEN AUTHENTICATION
   * **************************************
   * All methods receive route and callback, return into the
   * callback the error and the response
   */

    callAjaxPostWithoutToken(route, data, cb) {
    request.post(_URL + route)
      .set('Accept', 'application/json')
      .type('application/json')
      .send(data)
      .end((err, res)=> {
        cb(err, res);
      });
  },

  callAjaxGetWithoutToken(route, cb) {
    request.get(_URL + route)
      .set('Accept', 'application/json')
      .type('application/json')
      .end((err, res)=> {
        cb(err, res);
      });
  },


}

module.exports = API;
