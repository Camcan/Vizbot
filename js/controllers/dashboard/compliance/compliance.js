"use strict";


app.controller('ComplianceCtrl', ['$scope', 'Consent','User','fileUpload', function ($scope, Consent, User, fileUpload) {


	var idconsent = JSON.parse(sessionStorage.getItem('idConsentSelected'));
	$scope.compliance = '';
	$scope.urlUpload = "http://ec2-52-18-99-146.eu-west-1.compute.amazonaws.com/consents/";
	$scope.username = JSON.parse(sessionStorage.getItem('username'));

	$scope.init = function(){
		$scope.consent = Consent.get({_id: idconsent} )
		.$promise.then(function(consent) {
			$scope.consent = consent;
		});
	};

	$scope.uploadFile = function(compliance){
		var file = $scope.myFile;
		var uploadUrl = $scope.urlUpload + idconsent +'/codeCompliance/' + compliance ;
		var ret = fileUpload.uploadFileToUrl(file, uploadUrl);
		ret.success(function(){
			$scope.docAdded = true;
			$scope.checkInfoDocument = true;
			$('#addDocument').modal('hide');
			$scope.myFile = null;
			$scope.init();
		})
		.error(function(){
			return false;
		});
	};
}]);