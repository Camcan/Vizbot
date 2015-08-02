app.controller('ConsentsCtrl', ['$scope', '$location',
	'User',
	'Consent',

	function ($scope,$location, User, Consent) {
	//$scope.consents = JSON.parse(sessionStorage.getItem('consents'));
	$scope.newconsent = new Consent({
		role : 'Agent'
	});
	$scope.consents = [];
	var cat = {},
		newUse = {};


	$scope.init = function(){
		var consentslist = Consent.byUser({'userId':JSON.parse(sessionStorage.getItem('userId'))}, function(response){
			angular.forEach(response, function (item){
				$scope.consents.push(item);
			});
			sessionStorage.setItem('consents', JSON.stringify($scope.consents));
		});

		User.get({id:JSON.parse(sessionStorage.getItem('userId')) }).$promise.then(function(user){
			sessionStorage.setItem('username', JSON.stringify(user.name));
			$scope.username = user.name;
		});
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
		if($scope.newconsent.title && $scope.newconsent.role && $scope.newconsent.address){
			$scope.newconsent.user = JSON.parse(sessionStorage.getItem('userId'));
			$scope.newconsent.councilref = "Not Assigned";
			$scope.newconsent.status = "create";
			$('#addConsent').modal('hide');
			$('#building').modal({backdrop: 'static', 
								keyboard:'false'});
			$scope.step1 = true;
		}

	};

	$scope.step = function(number){
		
		if(number == 1 ) { // Housing
			cat.first = 'housing';
			$scope.step11 = true;
			$scope.step1 = false;
		}
		if(number == 2 ) { // communal Residential
			cat.first = 'communal';
			$scope.step12 = true;
			$scope.step1 = false;
		}
		if(number == 3 ) { // Non communal Residential
			cat.first = 'nonCommunal';
			$scope.step13 = true;
			$scope.step1 = false;
		}
		if(number == 4 ) { // Commercial
			cat.first = 'commercial';
			$scope.step2 = true;
			$scope.step1 = false;
		}
		if(number == 5 ) { // Industrial
			cat.first = 'industrial';
			$scope.step2 = true;
			$scope.step1 = false;
		}
		if(number == 6 ) { // Outbuildings
			cat.first = 'outbuildings';
			$scope.step2 = true;
			$scope.step1 = false;
		}

		

		if(number == 41 ) { // Housing
			newUse.first = 'housing';
			$scope.step41 = true;
			$scope.step4 = false;
		}
		if(number == 42 ) { // communal Residential
			newUse.first = 'communal';
			$scope.step42 = true;
			$scope.step4 = false;
		}
		if(number == 43 ) { // Non communal Residential
			newUse.first = 'nonCommunal';
			$scope.step43 = true;
			$scope.step4 = false;
		}
		if(number == 44 ) { // Commercial
			newUse.first = 'commercial';
			$scope.step5 = true;
			$scope.step4 = false;
		}
		if(number == 45 ) { // Industrial
			newUse.first = 'industrial';
			$scope.step5 = true;
			$scope.step4 = false;
		}
		if(number == 46 ) { // Outbuildings
			newUse.first = 'outbuildings';
			$scope.step5 = true;
			$scope.step4 = false;
		}
	};
	$scope.dwelling = function(number){
		if(number == 1 ) { // Detached Dwelling 
			cat.second = 'detached';
			$scope.step2 = true;
			$scope.step11 = false;
		}
		if(number == 2 ) { // Multi Unit Dwelling
			cat.second = 'multiUnit';
			$scope.step2 = true;
			$scope.step11 = false;
		}
		if(number == 3 ) { // Group Dwelling
			cat.second = "group";
			$scope.step2 = true;
			$scope.step11 = false;
		}
		if(number == 41 ) { // Detached Dwelling 
			newUse.second = 'detached';
			$scope.step41 = false;
			$scope.step5  = true;
		}
		if(number == 42 ) { // communal Residential
			newUse.second = 'multiUnit';
			$scope.step41 = false;
			$scope.step5  = true;
		}
		if(number == 43 ) { // Non communal Residential
			newUse.second = "group";
			$scope.step41 = false;
			$scope.step5  = true;
		}
	};

	$scope.community = function(number){
		if(number == 1 ) { // Community Service
			cat.second = "communityService";
			$scope.step2 = true;
			$scope.step12 = false;
		}
		if(number == 2 ) { // Community Care
			cat.second = "communityCare";
			$scope.step2 = true;
			$scope.step12 = false;
		}
		if(number == 41 ) { // COmmunity Service
			newUse.second = "communityService";
			$scope.step5 = true;
			$scope.step42 = false;
		}
		if(number == 42 ) { // Community Care
			newUse.second = "communityCare";
			$scope.step5 = true;
			$scope.step42 = false;
		}
	};

	$scope.assembly = function(number){
		if(number == 1 ) { // Assembly Service
			cat.second = "assemblyService";
			$scope.step2 = true;
			$scope.step13 = false;
		}
		if(number == 2 ) { // Assembly Care
			cat.second = "assemblyCare";
			$scope.step2 = true;
			$scope.step13 = false;
		}
		if(number == 41 ) { // Assembly Service
			newUse.second = "assemblyService";
			$scope.step5 = true;
			$scope.step43 = false;
		}
		if(number == 42 ) { // Assembly Care
			newUse.second = "assemblyCare";
			$scope.step5 = true;
			$scope.step43 = false;
		}
	};

	$scope.next = function(){
		if($scope.newconsent.numberPeople && $scope.newconsent.old && $scope.newconsent.intended){
			$scope.step2 = false;
			$scope.step3 = true;
		}
	};

	$scope.optionYes = function(){
		$scope.step3 = false;
		$scope.step4 = true;
	};

	$scope.final = function(){
		$scope.step1  = false;
		$scope.step2  = false;
		$scope.step3  = false;
		$scope.step4  = false;
		$scope.step5  = false;
		$scope.step41 = false;
		$scope.step42 = false;
		$scope.step43 = false;

		$scope.newconsent.lawfullyUse = cat;
		$scope.newconsent.newUse = newUse;

		$scope.consents.push($scope.newconsent);
		sessionStorage.setItem('consents', JSON.stringify($scope.consents));
		$scope.newconsent.$save();
		$('#building').modal('hide');
	};
	
}]);