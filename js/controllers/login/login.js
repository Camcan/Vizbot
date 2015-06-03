app.controller('LoginCtrl', ['$scope', '$location','$http', function ($scope, $location, $http) {

	function getConsents(){
		var res = $http.get("http://localhost:3000/users/" + $scope.userId +"/consents");
		res.success(function(data, status, headers, config) {
			$scope.consents = data;
			localStorage.setItem('consents', JSON.stringify($scope.consents));
			$location.path("/consents/");
		});
		res.error(function(data, status, headers, config) {
			alert( "User or password wrong: " + JSON.stringify({data: data}));
		});
	}

	$scope.save = function(){
		var logIn = {
				mail : $scope.login.mail,
				pwd : $scope.login.pwd,
		};
		var res = $http.put("http://localhost:3000/users", logIn);
		res.success(function(data, status, headers, config) {
			$scope.userId = headers('id');
			localStorage.setItem('userId', JSON.stringify($scope.userId));
			$scope.message = data;
			getConsents();
		});
		res.error(function(data, status, headers, config) {
			alert( "User or password wrong: " + JSON.stringify({data: data}));
		});
	};
}]);