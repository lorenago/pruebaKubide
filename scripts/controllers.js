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
	$http.get(BANDS).then(function(id){
		var band = id.data;
		$scope.band = findBand(band, $scope.band_Id);
		infoBand($scope.band);
	});

	function infoBand(band) {
		if(band.text==""){
			document.getElementById("spinner").style.visibility = "visible";
			band.wiki;		
			$.ajax({
				type: "GET",
				url: "https://es.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&titles=" + band.wiki,
				
				success: function(response){
					result = response.query.pages;
					var pages = response.query;
					var text;
					for (var i in result) {
						pageid = i;
					}
					var x = pageid;		
					var text = response.query.pages[x].extract;
					for (var i = 0; i < text.length; i++) {
						if(text[i]== '<') {
							if (text[i+1] == '/') {
								if (text[i+2] == 'p') {
									j = i+3;
									text = text.slice(0, j);
									break;
								}
							}
						}
					}
					var el = document.createElement('html');
					el.innerHTML = text;
					band.text = el.innerText; 
					document.getElementById("spinner").style.visibility = "hidden";
				},
				error: function(error){
					console.error('No se han encontrado resultados.', error);
				}
			});
		}
		else {
			$scope.band = band;
			document.getElementById("spinner").style.visibility = "hidden";
		}
	}
	$scope.view = function(band, element) {
		document.getElementById("vid").style.visibility = "visible";
			$scope.video = false;
			$scope.image = false;
			$scope.text = false;
		switch (element){
			case "video":
				$scope.video = !$scope.video;
			//	document.getElementById("video").style.display = "flex";
			case "image":
				$scope.image = !$scope.image;
				//document.getElementById("image").style.display = "flex";
			case "text":
				$scope.text = !$scope.text;
			//	document.getElementById("text").style.display = "flex";
		}
		//document.getElementById(element).style.visibility = "visible";
	}
};


(function() {
	var ctrl = angular.module('myApp.controllers', []);
	ctrl.controller('homeController', function (){});
	ctrl.controller('fooController', function (){});
	ctrl.controller('barController', function (){});
	ctrl.controller('menuController', menuController);
	ctrl.controller('bandController', bandController);
	//	ctrl.controller('indexController', indexController);
})();



/*

var el = document.createElement('html');
					el.innerHTML = response.query.pages[x].extract;
					for (var i = 0; i < el.outerHTML.length; i++) {
						if(el.outerHTML[i]== '<') {
							if (el.outerHTML[i+1] == '/') {
								if (el.outerHTML[i+2] == 'p') {
									text = el.outerHTML;
									j = i+3;
									text = text.slice(25, j);
									break;
								}
							}
						}
					}
					band.text = text; 


*/