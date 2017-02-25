var BANDS = "data/band.json";
var PAGES = "data/pages.json";
var SLIDES = "data/slides.json";

var findBand = function (array, id){
  for (var i = 0, m = null; i<array.length; i++){
    if (array[i].path == id) {
      return array[i];
    };
  };
};

function homeController($scope, $route, $http){
	$scope.$route = $route;
	$http.get(SLIDES).then(function(res){
		$scope.slide = res.data;
	});
	$http.get(BANDS).then(function(id){
		$scope.bands = id.data;
		getBandSelected($scope.bands, $scope, $route, $http);
	});
}

function getBandSelected(bands, $scope, $route, $http){
	for (var i = 0; i < bands.length; i++) {
		$.ajax({
			type: "GET",
			url: "https://es.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&titles=" + bands[i].wiki,
			success: function(response){
				result = response.query.pages;
				var pages = response.query;
				var description;
				for (var i in result) {
					pageid = i;
				}
				var x = pageid;		
				var description = response.query.pages[x].extract;
				for (var i = 0; i < description.length; i++) {
					if(description[i]== '<') {
						if (description[i+1] == '/') {
							if (description[i+2] == 'p') {
								j = i+3;
								description = description.slice(0, j);
								break;
							}
						}
					}
				}
				var el = document.createElement('html');
				el.innerHTML = description;
				for (var i = 0; i < bands.length; i++) {
					if(bands[i].name == response.query.pages[x].title){
						bands[i].description = el.innerText;
					}
				}
				localStorage.bands = JSON.stringify(bands);

			},
			error: function(error){
				console.error('No se han encontrado resultados.', error);
			}
		});
	}
}

function menuController($scope, $route, $http){
	$scope.$route = $route;
	$http.get(PAGES).then(function(res){
		$scope.pages = res.data;
	});
};

function bandController($scope, $route, $routeParams, $http){
	document.getElementById("spinner").style.visibility = "visible"
	var bandSelected = "";
	$scope.$route = $route;
	$scope.band_Id = $routeParams.id;
	var band = JSON.parse(localStorage.bands);
	$scope.band = findBand(band, $scope.band_Id);
	document.getElementById("spinner").style.visibility = "hidden";
	$scope.view = "";

	$scope.toView = function(element) {
		$scope.view = "";
		switch (element){
			case "video":
				$scope.view = "video";
				break;
			case "discography":
				$scope.view = "discography";
				break;
			case "description":
				$scope.view = "description";
				break;
		}
	}
	$scope.close = function(){
		$scope.view = "";
	}
};

(function() {
	var ctrl = angular.module('myApp.controllers', []);
	ctrl.controller('homeController', homeController);
	ctrl.controller('fooController', function (){});
	ctrl.controller('barController', function (){});
	ctrl.controller('menuController', menuController);
	ctrl.controller('bandController', bandController);
})();