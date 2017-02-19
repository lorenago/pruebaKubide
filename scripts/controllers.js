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
};

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
	

	function getBandSelected(){
		return new Promise( function(resolve, reject) {
			$http.get(BANDS).then(function(id){
				var band = id.data;
				$scope.band = findBand(band, $scope.band_Id);
				bandSelected = $scope.band.wiki;
				if ($scope.band) {
					resolve($scope.band);
				} else {
					var error = 'No se han encontrado resultados';
					reject(error);
				}
				
				
			});
		})
	}
	getBandSelected()
	.then(function(){
		
		$.ajax({
			type: "GET",
			url: "https://es.wikipedia.org/w/api.php?format=json&action=query&prop=revisions&rvprop=content&rvparse&titles=" + bandSelected,
			success: function(response){
				result = response.query.pages;
				var pages = response.query;
				for (var i in result) {
					pageid = i;
				}
				var x = pageid;
				alert('Ahora verías algo');
				$scope.band.text = response.query.pages[x].revisions[0]["*"];
				document.getElementById("spinner").style.visibility = "hidden"
				
			},
			error: function(error){
				console.error('No se han encontrado resultados.', error);
			},
			dataType: "JSON" 
		});
	})
	.catch(function () {
		console.log('Error');
	})

	//Wiki API 

	// http://en.wikipedia.org/w/api.php?format=json&action=query
	// titles=PáginaA|PáginaB|PáginaC

	//Imagen:
	// http://es.wikipedia.org/w/api.php?format=json&action=query&titles=Archivo:Gandhi_Nehru_Indira.jpg&prop=imageinfo&iiprop=url|size
	// respuesta.query.pages[-1].imageinfo[0].url

};


(function() {
	var ctrl = angular.module('myApp.controllers', []);
	ctrl.controller('homeController', function (){});
	ctrl.controller('fooController', function (){});
	ctrl.controller('barController', function (){});
	ctrl.controller('menuController', menuController);
	ctrl.controller('bandController', bandController);
})();