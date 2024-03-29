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
		$scope.hasContact = false;
		$scope.contact ={
			info : 'agent'
		};
		$scope.consent = new Consent();


		$scope.init = function(){
			$scope.consent = Consent.get({_id: idconsent} )
			.$promise.then(function(consent) {
				$scope.consent = consent;
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
				if(consent.contact){
					$scope.hasContact = true;
					$scope.contact = consent.contact;
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

		$scope.saveContact = function(){
			$scope.consent = Consent.get({_id : idconsent})
			.$promise.then(function(consent){
				$scope.consent = consent;
				if($scope.contact.info == 'owner'){
					$scope.consent.contact = $scope.consent.client; 
					$scope.consent.$save();
					$scope.hasContact = true;
				} else if($scope.contact.info == 'agent'){
					$scope.consent.contact = $scope.consent.agent; 
					$scope.consent.$save();
					$scope.hasContact = true;
				} else if($scope.contact.info == 'other'){
					$scope.consent.contact = $scope.contact; 
					$scope.consent.$save();
					$scope.hasContact = true;
				}
				$('#addContact').modal('hide');
			});
		};


		$scope.saveLBP = function(){
			$scope.consent = Consent.get({_id : idconsent})
			.$promise.then(function(consent){
				$scope.consent = consent;
				if($scope.lbp){
					if($scope.lbp._id){
						for(var i = $scope.consent.lbp.length - 1; i >= 0; i--) {
							if($scope.consent.lbp[i]._id === $scope.lbp._id) {
								$scope.consent.lbp.splice(i, 1);
							}
						}
					}
					$scope.consent.lbp.push($scope.lbp); 
					$scope.consent.$save();	
					$scope.hasLBP = true;
				}
				$('#addLbp').modal('hide');
			});
		};

		$scope.editLbp = function(lbp){
			$('#addLbp').modal('show');
			$scope.lbp = lbp;
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
				if($scope.people){
					if($scope.people._id){
						for(var i = $scope.consent.people.length - 1; i >= 0; i--) {
							if($scope.consent.people[i]._id === $scope.people._id) {
								$scope.consent.people.splice(i, 1);
							}
						}
					}
					$scope.consent.people.push($scope.people); 
					$scope.consent.$save();
					$scope.hasPro = true;
				}
				$('#addPro').modal('hide');
			});
		};

		$scope.editPro = function(item){
			$('#addPro').modal('show');
			$scope.people = item;
		};

		$scope.deletePro = function(people){
			$scope.consent = Consent.get({_id : idconsent})
			.$promise.then(function(consent){
				$scope.consent = consent;
				for(var i = $scope.consent.people.length - 1; i >= 0; i--) {
					if($scope.consent.people[i]._id === people._id) {
						$scope.consent.people.splice(i, 1);
					}
				}
				$scope.consent.$save();
				$('#addPro').modal('hide');
			});
			
		};
	}]);