"use strict";

app.controller('HomeCtrl', ['$scope','$location','User', 'Consent', function ($scope, $location,  User, Consent) {

//$scope.user = new User();
	$scope.consent = new Consent();
	$scope.consents = [];
	$scope.loginMistake = false;
	$scope.loginerror = ' ';
	
	$scope.save = function(){
		User.logIn({}, $scope.login, function(data,headers){
			sessionStorage.clear();
			sessionStorage.setItem('userId', JSON.stringify(headers('id')));
			User.get({id:JSON.parse(sessionStorage.getItem('userId')) }).$promise.then(function(user){
				console.log(user);
				window.Intercom('boot', {
				  app_id: "tde5lwyt",
				  name: user.name, // TODO: The current logged in user's full name
				  email: user.mail, // TODO: The current logged in user's email address.
				  created_at: Date() // TODO: The current logged in user's sign-up date as a Unix timestamp.
				});
				$scope.username = user.name;
			});
			$location.path("/consents/");
		}, function(err){
			$scope.loginMistake = true;
			$scope.loginerror = "The user name or password is incorrect";
		});
	};
}]);