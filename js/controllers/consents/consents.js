app.controller('ConsentsCtrl', ['$scope', function ($scope) {

	$scope.test = "something";
	$scope.saved = localStorage.getItem('consents');
	$scope.consents = JSON.parse($scope.saved);


}]);