app.controller('CreateConsentCtrl', ['$scope', '$location', function ($scope, $location) {

	$scope.save = function(){
		$location.path("/consents/");
	};
}]);