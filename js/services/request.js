 app.factory('User', ['$resource', function($resource) {

	return $resource('http://ec2-54-154-80-189.eu-west-1.compute.amazonaws.com/users/:id', {id : '@id'}, {
		all: {method: "GET", isArray: true, url: "http://ec2-54-154-80-189.eu-west-1.compute.amazonaws.com/users"},
		byConsent: {method: "GET", isArray: true, url: "http://localhost:3000/consents/people"},
		logIn: {method:"PUT", url:"http://localhost:3000/users"}
	});
}]);

 app.factory('Consent', ['$resource', function($resource) {
	return $resource('http://ec2-54-154-80-189.eu-west-1.compute.amazonaws.com/consents/:_id', {_id : '@_id'}, {
		all: {method: "GET", isArray: true, url: "http://ec2-54-154-80-189.eu-west-1.compute.amazonaws.com/consents"},
		byUser: {method: "GET", isArray: true, url: "http://ec2-54-154-80-189.eu-west-1.compute.amazonaws.com/users/:userId/consents"}
	});
}]);