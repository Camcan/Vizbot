 app.factory('User', ['$resource', function($resource) {

	return $resource('http://localhost:3000/users/:id', {id : '@id'}, {
		all: {method: "GET", isArray: true, url: "http://localhost:3000/users"},
		byConsent: {method: "GET", isArray: true, url: "http://localhost:3000/consents/people"},
		logIn: {method:"PUT", url:"http://localhost:3000/users"}
	});
}]);

 app.factory('Consent', ['$resource', function($resource) {
	return $resource('http://localhost:3000/consents/:id', {id : '@id'}, {
		all: {method: "GET", isArray: true, url: "http://localhost:3000/consents"},
		byUser: {method: "GET", isArray: true, url: "http://localhost:3000/users/:userId/consents"},
		addDocument: {method :"PUT", isArray:true, url : "http://localhost:3000/consents/:consentId/document"},
		addPeople: {method :"PUT", isArray:true, url : "http://localhost:3000/consents/:consentId/people"},
		addBuildingInfo: {method :"PUT", isArray:true, url : "http://localhost:3000/consents/:consentId/buildingInfo"},
		addMoreInfo: {method :"PUT", isArray:true, url : "http://localhost:3000/consents/:consentId/more"},
		addProject: {method :"PUT", isArray:true, url : "http://localhost:3000/consents/:consentId/project"}
	});
}]);