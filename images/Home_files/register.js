app.controller('RegisterCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {

	$scope.step = 1;
	$scope.create = function(){
		var user = {
				name : $scope.register.name,
				mail : $scope.register.mail,
				pwd : $scope.register.pwd,
				registration : $scope.register.registration,
				address : $scope.register.address
		};
		var res = $http.post("http://localhost:3000/users", user);
		res.success(function(data, status, headers, config) {
			$scope.message = data;
			$scope.userId = headers.id;
			$location.path("/consents/");
		});
		res.error(function(data, status, headers, config) {
			alert( "failure message: " + JSON.stringify({data: data}));
		});
	};

	$scope.next = function(){
		$scope.step++;
	};

	$scope.previous = function(){
		$scope.step--;
	};
}]);