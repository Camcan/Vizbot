app.controller('RegisterCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {

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
			$location.path("/consents/");
		});
		res.error(function(data, status, headers, config) {
			alert( "failure message: " + JSON.stringify({data: data}));
		});
	};

}]);