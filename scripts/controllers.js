var ENDPOINT = "data/band.json";
var PAGES = "data/pages.json";

var findBand = function (array, id){
  for (var i = 0, m = null; i<array.length; i++){
    if (array[i].id == id) {
      return array[i];
    };
  };
};

function indexController($scope, $route, $http){
	$scope.$route = $route;
	$http.get(PAGES).then(function(res){
		$scope.pages = res.data;
	});
};

function bandController($scope, $route, $routeParams, $http){
	$scope.$route = $route;
	$scope.band_Id = $routeParams.bandId;
	$http.get(url).then(function(id){
		var band = id.data;
		$scope.bands = findBand(band, $scope.band_Id);
	});
};


(function() {
	var ctrl = angular.module('myApp.controllers', []);
	ctrl.controller('indexController', indexController);
	ctrl.controller('bandController', bandController);
})();