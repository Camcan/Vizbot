app.controller('ConsentsCtrl', ['$scope', '$location',
	'User',
	'Consent',

	function ($scope,$location, User, Consent) {
	//$scope.consents = JSON.parse(sessionStorage.getItem('consents'));
	$scope.newconsent = new Consent();
	$scope.consents = new Array();

	$scope.init = function(){
	var consentslist = Consent.byUser({'userId':JSON.parse(sessionStorage.getItem('userId'))}, function(response){
		angular.forEach(response, function (item){
        	$scope.consents.push(item);
        	sessionStorage.setItem('consents', JSON.stringify($scope.consents));
			});
	});

	User.get({id:JSON.parse(sessionStorage.getItem('userId')) })
	.$promise.then(function(user){
		sessionStorage.setItem('username', JSON.stringify(user.name));
		$scope.username = user.name;
	});
	console.log($scope.consents);
	}

	function updateConsents(){
		var consentslist = Consent.byUser({'userId':JSON.parse(sessionStorage.getItem('userId'))}, function(response){
			angular.forEach(response, function (item){
            	$scope.consents.push(item);
            	sessionStorage.setItem('consents', JSON.stringify($scope.consents));
   			});
		});
	}
	$scope.dashboard = function(id){
		sessionStorage.setItem('idConsentSelected', JSON.stringify(id));
		$location.path("/dashboard/");
	};

	$scope.createConsent = function(){
		$scope.newconsent.user = JSON.parse(sessionStorage.getItem('userId'));
		$scope.newconsent.councilref = "Not Assigned";
		$scope.newconsent.status = "create";
		$('#addConsent').modal('hide');
		$scope.consents.push($scope.newconsent);
		sessionStorage.setItem('consents', JSON.stringify($scope.consents));
		$scope.newconsent.$save();
	};

	
}]);