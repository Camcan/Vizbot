	app.controller('DashboardCtrl', ['$scope', 'Consent','User', function ($scope, Consent, User) {

	
	$scope.timeline = new Array();
	$scope.stepbar = new Array();

	$scope.init = function(){
		var idconsent = JSON.parse(sessionStorage.getItem('idConsentSelected'));
		$scope.consent = Consent.get({_id: idconsent})
		.$promise.then(function(consent) {
	      $scope.consent = consent;
	      if($scope.consent.status == 'create' || $scope.consent.status == 'submit' ){
			$scope.status = 'Action from Agent required';
		   }
		   else
			$scope.status = 'Action from Council required';	
		updatestatus();
		prepareTimeline();
	    });
	};

	$scope.submitApplication = function(){
		$scope.consent.status = 'vetting';
		$scope.status = 'Action from Council required';	
		prepareTimeline();
	};

	function updatestatus(){
		if($scope.consent.project && $scope.consent.buildingInfo && $scope.consent.people){
			if($scope.consent.status == 'create')
				$scope.consent.status = 'submit';
		}
	};

	function prepareTimeline(){
		if($scope.consent.status == 'create'){
			var elem = {
				title : "First Step",
				date : new Date(),
				by : "Vizbot",
				text : "Your project information is a crucial in making sure you add the required information for an application for a building consent. You can add and save information at any time to compile your application. When it's completed you'll be ready to submit it to Council",
				icon : "glyphicon glyphicon-edit"
			};
			$scope.timeline.push(elem);
			$scope.stepbar = {
				create : "complete",
				build : "active",
				submit : "disabled",
				vetting : "disabled",
				approval : "disabled",
				rfi : "disabled",
				approved : "disabled"
			};
		}
		if($scope.consent.status == 'submit'){
			var elem = {
				title : "Submit your consent",
				date : new Date(),
				by : "Vizbot",
				text : "All information for your application are supplied, you now can submit your application",
				icon : "glyphicon glyphicon-share"
			};
			$scope.timeline.push(elem);
			$scope.stepbar = {
				create : "complete",
				build : "complete",
				submit : "active",
				vetting : "disabled",
				approval : "disabled",
				rfi : "disabled",
				approved : "disabled"
			};
			$scope.daysRemaining = 20;
		}
		if($scope.consent.status == 'vetting'){
			var elem = {
				title : "We have all the information we need to assess your application",
				date : new Date(),
				by : "Vizbot",
				text : "The application contains all the information required to assess the application. The Council reference number for the consent is : ",
				icon : "glyphicon glyphicon-ok"
			};
			$scope.timeline.push(elem);
			$scope.stepbar = {
				create : "complete",
				build : "complete",
				submit : "complete",
				vetting : "active",
				approval : "disabled",
				rfi : "disabled",
				approved : "disabled"
			};
		}
	};

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