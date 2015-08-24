"use strict";

var url = 'http://ec2-52-18-99-146.eu-west-1.compute.amazonaws.com',
	server = 'http://localhost:3000';


 app.factory('User', ['$resource', function($resource) {
	return $resource(url + '/users/:id', {id : '@id'}, {
		all: {method: "GET",isArray: true, url: url + "/users", headers:{'Authorization': 'Basic dml6Ym90QHZpemJvdC5jb206dml6Ym90' }},
		byConsent: {method: "GET", isArray: true, url: url + "/consents/people", headers:{'Authorization': 'Basic dml6Ym90QHZpemJvdC5jb206dml6Ym90' }},
		logIn: {method:"PUT", url: url +"/users", headers:{'Authorization': 'Basic dml6Ym90QHZpemJvdC5jb206dml6Ym90' }}
	});
}]);

 app.factory('Consent', ['$resource', function($resource) {
	return $resource(url +'/consents/:_id', {_id : '@_id'}, {
		get: {method: "GET",headers:{'Authorization': 'Basic dml6Ym90QHZpemJvdC5jb206dml6Ym90' }},
		all: {method: "GET"},
		byUser: {method: "GET", isArray: true, url: url + "/users/:userId/consents",headers:{'Authorization': 'Basic dml6Ym90QHZpemJvdC5jb206dml6Ym90' }}
	});
}]);