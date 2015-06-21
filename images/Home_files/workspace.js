app.controller('WorkspaceCtrl', ['$scope', 'Consent','User', function ($scope, Consent, User) {

	
	$scope.checkInfoBuilding = false;
	$scope.checkInfoPeople = false;
	$scope.checkInfoProject = false;
	$scope.checkInfoDocument = false;


	$scope.addBuildingInfo = function(){
		$('#addBuildingInfo').modal('hide'); 
		$scope.checkInfoBuilding = true;
	};

	$scope.savePeople = function(){
		$('#addPeopleModal').modal('hide'); 
		$scope.checkInfoPeople = true;
	};

	$scope.saveProject = function(){
		$('#addproject').modal('hide'); 
		$scope.checkInfoProject = true;
	};

	$scope.saveDocument = function(){
		$('#addDocument').modal('hide'); 
		$scope.checkInfoDocument = true;
	};

}]);