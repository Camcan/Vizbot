"use strict";

app.controller('DashboardCtrl', ['$scope', '$location', 'Consent','User', function ($scope, $location,Consent, User) {

	
	$scope.timeline = [];
	$scope.stepbar = [];
	$scope.timelineTitle = "";

	var idconsent = JSON.parse(sessionStorage.getItem('idConsentSelected'));
	$scope.username = JSON.parse(sessionStorage.getItem('username'));

	$scope.init = function(){
		$scope.consent = Consent.get({_id: idconsent})
		.$promise.then(function(consent) {
			$scope.consent = consent;
	      // Add rfi description for the Agent
	      if($scope.consent.status == 'create' || $scope.consent.status == 'submit' ){
	      	$scope.status = 'Action from Agent required';
	      }
	      else
	      	$scope.status = 'Underway - Action from Council required';	
	      updatestatus();
	      prepareTimeline();
	  });
	};

	$scope.submitApplication = function(){
		$scope.consent = Consent.get({_id: idconsent})
		.$promise.then(function(consent) {
			$scope.consent = consent;
			$scope.consent.status = 'submitted';
			$scope.consent.workingDays = 20;
			$scope.status = 'Action from Council required';
			$scope.consent.$save();
			prepareTimeline();
		});		
	};

	$scope.vetting = function(){
		$scope.consent = Consent.get({_id: idconsent})
		.$promise.then(function(consent) {
			$scope.consent = consent;
			$scope.consent.status = 'vetting';
			$scope.consent.councilRef = 'SM34563';
			$scope.consent.workingDays = 20;
			$scope.status = 'Action from Council required';
			$scope.consent.$save();
			prepareTimeline();
		});	

	};

	/*      rfi_id : String,
      location : String,
      details : String, 
      response : String, 
      accepted : String,
      creted_by : String,
      date_letter_sent : String,
      date_of_response : String,
      date_signed_off : String,
      signed_off_by : String, 
      building_code_clause : String,
      building_code_sub_clause : String*/

      $scope.approval = function(){
      	$scope.consent = Consent.get({_id: idconsent})
      	.$promise.then(function(consent) {
      		$scope.consent = consent;
      		$scope.consent.status = 'approval';
      		$scope.consent.workingDays = 17;
      		$scope.status = 'Action from Council required';
      		$scope.consent.$save();
      		prepareTimeline();
      	});	

      };

      $scope.rfc = function(){
      	var rfi = [
      	{"rfi_id" : "SM456373",
      	"location" : "Building Consent Team",
      	"details" : "Plans on pages 3A, 3B and 4C don't indicate how sump insouth east corner links to plumbieng. Please provide updated plancs so we can identify how the plumbing arragment works (this request for clarification will be added to any formal Request for Information when your application is finished being assessed).",
      	"response" : "",
      	"created_by" : "John Baker",
      	"date_letter_sent" : "",
      	"date_of_response" : "",
      	"date_signed_off" : "",
      	"signed_off_by" : "", 
      	"building_code_clause" : "",
      	"building_code_sub_clause" : ""
      },
      {"rfi_id" : "SM456374",
      "location" : "Structural",
      "details" : "Structural information from material xxxxx used on north west corner omitted from application. Request manufacturer information for this  (this request for clarification will be added to any formal Request for Information when your application is finished being assessed)",
      "response" : "",
      "created_by" : "Ben Thomas",
      "date_letter_sent" : "",
      "date_of_response" : "",
      "date_signed_off" : "",
      "signed_off_by" : "", 
      "building_code_clause" : "",
      "building_code_sub_clause" : ""
  }
  ];
  $scope.consent = Consent.get({_id: idconsent})
  .$promise.then(function(consent) {
  	$scope.consent = consent;
  	$scope.consent.status = 'rfc';
  	$scope.consent.workingDays = 16;
  	$scope.consent.RFI = rfi;
  	$scope.status = 'Action from Council required';
  	$scope.consent.$save();
  	prepareTimeline();
  });	
};

$scope.rfi = function(){
	$scope.consent = Consent.get({_id: idconsent})
	.$promise.then(function(consent) {
		$scope.consent = consent;
		$scope.consent.status = 'rfi';
		$scope.consent.workingDays = 4;
		$scope.status = 'Action from Agent required';
		$scope.consent.$save();
		prepareTimeline();
	});	

};

function updatestatus(){
	if($scope.consent.project && $scope.consent.buildingInfo  && $scope.consent.people.length > 0 && $scope.consent.doc.length > 0){
		if($scope.consent.status == 'create')
			$scope.consent.status = 'submit';
	}
}

function prepareTimeline(){
	var elem = {};
	if($scope.consent.status == 'create'){
		elem = {
			title : "First Step",
				date : new Date(), // Only date not hour
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
			$scope.timelineTitle = "Compile Application";
		}
		if($scope.consent.status == 'submit'){
			elem = {
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
			
		}
		if($scope.consent.status =='submited'){
			elem = {
				title : "Your application has successfuly been submited",
				date : new Date(),
				by : "Vizbot",
				text : "We are now waiting on confirmation from the council that they have receive the application. There's nothing for you to do in the mean time. You will get notification when the council starts vetting your information",
				icon : "glyphicon glyphicon-hourglass"
			};
			$scope.timeline.push(elem);
			$scope.stepbar = {
				create : "complete",
				build : "complete",
				submit : "complete",
				vetting : "disabled",
				approval : "disabled",
				rfi : "disabled",
				approved : "disabled"
			};
			$scope.timelineTitle = "Application Submitted";
		}
		if($scope.consent.status == 'vetting'){
			elem = {
				title : "We have all the information we need to assess your application",
				date : new Date(),
				by : "Council",
				text : "The application contains all the information required to assess the application. The Council reference number for the consent is : " + $scope.consent.councilRef,
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
			$scope.timelineTitle = "Vetting";
		}
		if($scope.consent.status == 'approval'){
			elem = {
				title : "Someone are looking your application",
				date : new Date(),
				by : "Council",
				text : "Your application is underway, the Council will send you a request for information (RFI) if needed. You can view requests for clarification notes lodged by Council during processing. These notes will be included in the Council RFI.",
				icon : "glyphicon glyphicon-ok"
			};
			$scope.timeline.push(elem);
			$scope.stepbar = {
				create : "complete",
				build : "complete",
				submit : "complete",
				vetting : "complete",
				approval : "disabled",
				rfi : "disabled",
				approved : "disabled"
			};
			$scope.timelineTitle = "Approval Processing";
		}
		if($scope.consent.status == 'rfc'){
			if($scope.consent.RFI !== null){
				for(var i = 0; i < $scope.consent.RFI.length; i++) {
					elem = {
						title : "Request for clarification",
						date : new Date(),
						by : $scope.consent.RFI[i].created_by + " - " + $scope.consent.RFI[i].location,
						text : $scope.consent.RFI[i].details,
						icon : "glyphicon glyphicon-warning-sign"
					};	
					$scope.timeline.push(elem);	
				}
			}
			$scope.stepbar = {
				create : "complete",
				build : "complete",
				submit : "complete",
				vetting : "complete",
				approval : "complete",
				rfi : "disabled",
				approved : "disabled"
			};
			$scope.timelineTitle = "RFC";
		}

		if($scope.consent.status == 'rfi'){
			elem = {
				title : "Formal request for information issued",
				date : new Date(),
				by : "Council",
				text : "Email sent to agent	with the information required to continue processing application. Reminder set to 28th July to follow up with agent to request information",
				icon : "glyphicon glyphicon-warning-sign"
			};	
			$scope.timeline.push(elem);
			$scope.stepbar = {
				create : "complete",
				build : "complete",
				submit : "complete",
				vetting : "complete",
				approval : "complete",
				rfi : "active",
				approved : "disabled"
			};
			$scope.timelineTitle = "Request for information";
		}
		if($scope.consent.status == 'approved'){
			$scope.stepbar = {
				create : "complete",
				build : "complete",
				submit : "complete",
				vetting : "complete",
				approval : "complete",
				rfi : "complete",
				approved : "active"
			};
			$scope.timeline.push(elem);
			$scope.timelineTitle = "Approved";
		}
	}

	$scope.tasks = {
		buildingInfo : true,
		project : true,
		people : true,
		document : true,
		extra : true
	};

}]);