const request     = require('superagent');
const _           = require('lodash');
const _URL 	= "https://soylaurl.com";
//const _URL 	= "http://apidev.workep.com";

//localStorage.setItem("url",_URL);

/**
 * OBJECT FOR AJAX METHODS AND CONNECT WITH THE TRINITY API
 * *******************************************************
 * @type {Object}
 */
const API = {


  getToken() {
    //get token of cookie ...
    return "hola soy el token";
  },

	/**
	 * AJAX METHODS WITH TOKEN AUTHENTICATION
	 * **************************************
	 * All methods receive route and callback, return into the
	 * callback the error and the response
	 */

	callAjaxGet(route, cb) {
		request.get( _URL + route )
			.set('Accept', 'application/json')
  		.set('Authorization', 'Bearer ' + this.getToken())
			.type('application/json')
			.end((err, res)=>{
				cb(err, res);
			});
	},

	callAjaxPost(route, data, cb) {
		request.post(_URL+route )
			.set('Accept', 'application/json')
  		.set('Authorization', 'Bearer ' + this.getToken())
  		.type('application/json')
			.send(data)
			.end((err, res)=>{
				cb(err, res);
			});
	},

	callAjaxDelete(route,  cb) {
		request.del(_URL + route)
			.set('Accept', 'application/json')
  		.set('Authorization', 'Bearer ' + this.getToken())
  		.type('application/json')
			.end(( err, res )=>{
				cb(err, res);
			});
	},

	callAjaxUpdate(route, data, cb) {
		request.put(_URL+route )
			.set('Accept', 'application/json')
  		.set('Authorization', 'Bearer ' + this.getToken())
  		.type('application/json')
			.send(data)
			.end(( err, res )=>{
				cb(err, res);
			});
	},

	/**
	 * AJAX METHODS WITHOUT TOKEN AUTHENTICATION
	 * **************************************
	 * All methods receive route and callback, return into the
	 * callback the error and the response
	 */

	callAjaxPostWithoutToken(route, data, cb) {
	    request.post(_URL+route )
	      .set('Accept', 'application/json')
	      .type('application/json')
	      .send( data )
	      .end((err, res)=>{
	        cb(err, res);
	      });
  	},

	callAjaxGetWithoutToken(route, cb) {
    	request.get( _URL + route )
    		.set('Accept', 'application/json')
    		.type('application/json')
    		.end((err, res)=>{
    			cb(err, res);
    		});
	},

}

module.exports = API;
