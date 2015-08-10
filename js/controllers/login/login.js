"use strict";

app.controller('LoginCtrl', ['$scope', '$location',
	'User',
	'Consent',

	function ($scope, $location, User, Consent) {

	//$scope.user = new User();
	$scope.consent = new Consent();
	$scope.consents = [];
	$scope.loginMistake = false;
	$scope.loginerror = ' ';
	
	$scope.save = function(){
		User.logIn({}, $scope.login, function(data,headers){
			sessionStorage.clear();
			sessionStorage.setItem('userId', JSON.stringify(headers('id')));
			$location.path("/consents/");
		}, function(err){
			$scope.loginMistake = true;
			$scope.loginerror = "The user name or password is incorrect";
		});
	};
}]);