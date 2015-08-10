"use strict";

app.controller('ContactCtrl', ['$scope', '$location',
	'User',
	'Consent',

	function ($scope,$location, User, Consent) {

		var idconsent = JSON.parse(sessionStorage.getItem('idConsentSelected'));
		$scope.username = JSON.parse(sessionStorage.getItem('username'));
		$scope.hasAgent = false;
		$scope.hasClient = false;
		$scope.hasPro = false;
		$scope.hasLBP = false;
		$scope.isAgent = false;
		$scope.consent = new Consent();


		$scope.init = function(){
			$scope.consent = Consent.get({_id: idconsent} )
			.$promise.then(function(consent) {
				if(consent.role === "Agent"){
					$scope.isAgent = true;
				}else{
					if(consent.role === "Client/Owner"){
						$scope.isOwner = true;
					}
				}
				if(consent.agent){
					$scope.hasAgent = true;
					$scope.consent.agent = consent.agent;	
				}
				if(consent.client){
					$scope.hasClient = true;
					$scope.consent.client = consent.client;
				}
				if(consent.lbp.length > 0){
					$scope.hasLBP = true;
					$scope.consent.lbp = consent.lbp;
				}
				if(consent.people.length > 0){
					$scope.hasPro = true;
					$scope.consent.people = consent.people;
				}
			});
		};

		$scope.saveAgent = function(){
			$scope.consent = Consent.get({_id : idconsent})
			.$promise.then(function(consent){
				$scope.consent = consent;
				if($scope.agent){
					$scope.consent.agent = $scope.agent; 
					$scope.consent.$save();
					$scope.hasAgent = true;
				}
				$('#addAgent').modal('hide');
			});
		};

		$scope.saveClient = function(){
			$scope.consent = Consent.get({_id : idconsent})
			.$promise.then(function(consent){
				$scope.consent = consent;
				if($scope.client){
					$scope.consent.client = $scope.client; 
					$scope.consent.$save();
					$scope.hasClient = true;
				}
				$('#addOwner').modal('hide');
			});
		};


		$scope.saveLBP = function(){
			$scope.consent = Consent.get({_id : idconsent})
			.$promise.then(function(consent){
				$scope.consent = consent;
				if($scope.licensed){
					if($scope.licensed._id){
						for(var i = $scope.consent.lbp.length - 1; i >= 0; i--) {
							if($scope.consent.lbp[i]._id === $scope.licensed._id) {
								$scope.consent.lbp.splice(i, 1);
							}
						}
					}
					$scope.consent.lbp.push($scope.licensed); 
					$scope.consent.$save();	
					$scope.hasLBP = true;
				}
				$('#addLbp').modal('hide');
			});
		};

		$scope.editLbp = function(lbp){
			$('#addLbp').modal('show');
			$scope.licensed = lbp;
		};

		$scope.deleteLbp = function(lbp){
			$scope.consent = Consent.get({_id : idconsent})
			.$promise.then(function(consent){
				$scope.consent = consent;
				for(var i = $scope.consent.lbp.length - 1; i >= 0; i--) {
					if($scope.consent.lbp[i]._id === lbp._id) {
						$scope.consent.lbp.splice(i, 1);
					}
				}
				$scope.consent.$save();
				$('#addPro').modal('hide');
			});
			
		};

		$scope.savePro = function(){
			$scope.consent = Consent.get({_id : idconsent})
			.$promise.then(function(consent){
				$scope.consent = consent;
				if($scope.pro){
					if($scope.pro._id){
						for(var i = $scope.consent.people.length - 1; i >= 0; i--) {
							if($scope.consent.people[i]._id === $scope.pro._id) {
								$scope.consent.people.splice(i, 1);
							}
						}
					}
					$scope.consent.people.push($scope.pro); 
					$scope.consent.$save();
					$scope.hasPro = true;
				}
				$('#addPro').modal('hide');
			});
		};

		$scope.editPro = function(pro){
			$('#addLbp').modal('show');
			$scope.licensed = pro;
		};

		$scope.deletePro = function(pro){
			$scope.consent = Consent.get({_id : idconsent})
			.$promise.then(function(consent){
				$scope.consent = consent;
				for(var i = $scope.consent.people.length - 1; i >= 0; i--) {
					if($scope.consent.people[i]._id === pro._id) {
						$scope.consent.people.splice(i, 1);
					}
				}
				$scope.consent.$save();
				$('#addPro').modal('hide');
			});
			
		};

	}]);