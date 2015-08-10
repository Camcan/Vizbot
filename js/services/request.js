"use strict";

var url = 'http://ec2-52-18-99-146.eu-west-1.compute.amazonaws.com',
	server = 'http://localhost:3000';

 app.factory('User', ['$resource', function($resource) {
	return $resource(url + '/users/:id', {id : '@id'}, {
		all: {method: "GET", isArray: true, url: url + "/users"},
		byConsent: {method: "GET", isArray: true, url: url + "/consents/people"},
		logIn: {method:"PUT", url: url +"/users"}
	});
}]);

 app.factory('Consent', ['$resource', function($resource) {
	return $resource(url +'/consents/:_id', {_id : '@_id'}, {
		all: {method: "GET", isArray: true, url: url + "/consents"},
		byUser: {method: "GET", isArray: true, url: url + "/users/:userId/consents"}
	});
}]);