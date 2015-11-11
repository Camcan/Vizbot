"use strict";

app.controller('RegisterCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {

	$scope.step = 1;
	$scope.create = function(){
		var user = {
				name : $scope.register.name,
				mail : $scope.register.mail,
				pwd : $scope.register.pwd,
				address : $scope.register.address,
				phone : $scope.register.phone
		};
		var res = $http.post("http://ec2-52-18-99-146.eu-west-1.compute.amazonaws.com/users", user);
		res.success(function(data, status, headers, config) {
			$scope.message = data;
			$scope.userId = headers.id;
			sessionStorage.clear();
			sessionStorage.setItem('userId', JSON.stringify(headers('id')));
			window.Intercom('boot', {
				  app_id: "tde5lwyt",
				  name: user.name, // TODO: The current logged in user's full name
				  email: user.mail, // TODO: The current logged in user's email address.
				  created_at: Date() // TODO: The current logged in user's sign-up date as a Unix timestamp.
				});
			$location.path("/consents");
		});
		res.error(function(data, status, headers, config) {
			// Handle error 
		});
	};

	$scope.checkFirst = function(){
		if($scope.register.name && $scope.register.mail && $scope.register.pwd)
			$scope.step++;
	};
}]);