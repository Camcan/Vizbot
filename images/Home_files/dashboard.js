app.controller('DashboardCtrl', ['$scope', 'Consent','User', function ($scope, Consent, User) {

	var idconsent = JSON.parse(sessionStorage.getItem('idConsentSelected'));
	$scope.consent = Consent.get({id: idconsent});
	$scope.tasks = {

	}
	$scope.people = {

	};
	$scope.project = {

	};
	$scope.building = {

	};
	$scope.document = {

	};

	$scope.tasks = {
		buildingInfo : true,
		project : true,
		people : true,
		document : true,
		extra : true
	};

	$scope.savePeople = function(){
		var consent = {
			user :  "",
			title : $scope.consent.title,
			client : $scope.consent.client,
			address : $scope.consent.address
		};

	};

	$scope.submitPeople = function(){

	};

	$scope.addBuildingInfo = function(){

	};

	$scope.submitBuildingInformation = function(){

	};

	$scope.saveProject = function(){

	};

	$scope.submitProject = function(){

	};

	$scope.saveDocument = function(){

	};

}]);