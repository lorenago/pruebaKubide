function headerDirective() {
	return{
		restrict: 'A',
		templateUrl: './views/header.html'
	}
};

function menuDirective() {
	return{
		restrict: 'E',
		templateUrl: './views/menu.html'
	}
};

function footerDirective() {
	return{
		restrict: 'A',
		templateUrl: './views/footer.html'
	}
};

(function(){
	var dir = angular.module('myApp.directives', []);
	dir.directive('headerDirective', headerDirective);
	dir.directive('footerDirective', footerDirective);
	dir.directive('menuDirective', menuDirective);
})();