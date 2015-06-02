app.controller('LoginCtrl', ['$scope', '$location','$http', function ($scope, $location, $http) {

	$scope.save = function(){
		var logIn = {
				mail : $scope.login.mail,
				pwd : $scope.login.pwd,
		};
		var res = $http.put("http://localhost:3000/users", logIn);
		res.success(function(data, status, headers, config) {
			$scope.message = data;
			$location.path("/consents/");
		});
		res.error(function(data, status, headers, config) {
			alert( "User or password wrong: " + JSON.stringify({data: data}));
		});
	};
}]);