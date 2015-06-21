app.controller('ConsentsCtrl', ['$scope', '$location',
	'User',
	'Consent',

	function ($scope,$location, User, Consent) {
	$scope.consents = JSON.parse(sessionStorage.getItem('consents'));
	var newConsent = new Consent();

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
		newConsent.user = JSON.parse(sessionStorage.getItem('userId'));
		newConsent.title = $scope.newconsent.title;
		newConsent.client = $scope.newconsent.client;
		newConsent.address = $scope.newconsent.address;
		newConsent.status = "building consent";
		newConsent.$save();
		
		updateConsents();
		$location.path("/consents/");
	};
}]);