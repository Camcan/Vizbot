var app = angular.module('app', [
  'ngRoute',
  'ngResource'
]);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    $routeProvider.
      when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      }).
      when('/login', {
        templateUrl: 'views/login/login.html',
        controller: 'LoginCtrl'
      }).
      when('/register', {
        templateUrl: 'views/login/register.html',
        controller: 'RegisterCtrl'
      }).
      when('/consents', {
        templateUrl: 'views/consents/consents.html',
        controller: 'ConsentsCtrl'
      }).
      when('/createconsent', {
        templateUrl: 'views/consents/createconsent.html',
        controller: 'CreateConsentCtrl'
      }).
      when('/dashboard', {
        templateUrl: 'views/dashboard/dashboard.html',
        controller: 'DashboardCtrl'
      }).
      when('/workspace', {
        templateUrl: 'views/dashboard/workspace.html',
        controller: 'WorkspaceCtrl'
      }).
      when('/summary', {
        templateUrl: 'views/dashboard/summary.html',
        controller: 'SummaryCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
}]);
