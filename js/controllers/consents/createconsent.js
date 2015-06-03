app.controller('CreateConsentCtrl', ['$scope', '$location', '$http', function ($scope, $location, $http) {

	$scope.createConsent = function(){
		var consent = {
				user :  JSON.parse(localStorage.getItem('userId')),
				title : $scope.consent.title,
				client : $scope.consent.client,
				address : $scope.consent.address
		};
		var res = $http.post("http://localhost:3000/consents", consent);
		res.success(function(data, status, headers, config) {
			$scope.message = data;
			$location.path("/consents/");
		});
		res.error(function(data, status, headers, config) {
			alert( "User or password wrong: " + JSON.stringify({data: data}));
		});
	};
}]);