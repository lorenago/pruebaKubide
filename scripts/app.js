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
  app.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
      return $sce.trustAsResourceUrl(url);
    };
  }]);
  app.service('MetaService', function() {
    var metaTitle = 'Angular Rocks!';
    var metaDescription = 'Esto es la descripción por defecto';
    var metaKeywords = 'angular rocks default';
    return {
      set: function(newTitle, newMetaDescription, newKeywords) {
        metaKeywords = newKeywords;
        metaDescription = newMetaDescription;
        metaTitle = newTitle; 
      },
      metaTitle: function(){ return metaTitle; },
      metaDescription: function() { return metaDescription; },
      metaKeywords: function() { return metaKeywords; }
    }
  });
})();