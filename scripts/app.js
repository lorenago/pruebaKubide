function setConfig($locationProvider, $routeProvider){
	$locationProvider.html5Mode(true);
	$routeProvider
	.when('/', {
	    controller: 'indexController',
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
  	/*.when('/the-rolling-stones',{
    	controller: 'rollingController',
    	templateUrl: 'views/the-rolling-stones.html',
  	})
  	.when('/the-beatles',{
    	controller: 'beatlesController',
    	templateUrl: 'views/the-beatles.html',
  	})
  	.when('/queen',{
    	controller: 'queenController',
    	templateUrl: 'views/queen.html',
  	})*/
};
(function () {
	var app = angular.module('myApp', ['ngRoute', 'myApp.controllers']);//, 'myApp.directives'
	app.config(['$locationProvider', '$routeProvider', setConfig]);
})();