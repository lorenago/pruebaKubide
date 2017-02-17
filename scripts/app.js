function setConfig($locationProvider, $routeProvider){
	$locationProvider.html5Mode(true);
	$routeProvider
    .when('/', {
	    controller: 'homeController',
	    templateUrl: './views/home.html'
  	})
  	.when('/foo', {
    	controller: 'fooController',
    	templateUrl: './views/foo.html'
  	})
  	.when('/bar',{
    	controller: 'barController',
    	templateUrl: 'views/bar.html',
  	})
  	.when('/:id',{
    	controller: 'bandController',
    	templateUrl: 'views/band.html',
  	})
};
(function () {
	var app = angular.module('myApp', ['ngRoute', 'myApp.controllers', 'myApp.directives']);
	app.config(['$locationProvider', '$routeProvider', setConfig]);
})();