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

	$scope.next = function(){
		$scope.step++;
	};

	$scope.previous = function(){
		$scope.step--;
	};
}]);