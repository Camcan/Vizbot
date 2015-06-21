app.controller('LoginCtrl', ['$scope', '$location',
	'User',
	'Consent',

	function ($scope, $location, User, Consent) {

	//$scope.user = new User();
	$scope.consent = new Consent();
	$scope.consents = new Array();
	console.log($scope.user);
	$scope.login = {
		mail : "mohamed@gmail.com",
		pwd : "pwd"
	};
	function getConsents(){
		var consentslist = Consent.byUser({'userId':JSON.parse(sessionStorage.getItem('userId'))}, function(response){
			angular.forEach(response, function (item){
            	$scope.consents.push(item);
            	sessionStorage.setItem('consents', JSON.stringify($scope.consents));
   			});
		});
		console.log($scope.consents);
		$location.path("/consents/");
	}

	$scope.save = function(){

		User.logIn({}, $scope.login, function(data,headers){
			sessionStorage.setItem('userId', JSON.stringify(headers('id')));
			getConsents();
		});
	};
}]);