app.controller('ProductSpecCtrl', ['$scope', '$location', '$http', function ($scope, $location, $http) {

	$scope.categories = [{"primary":"Adhesives & Compounds","primary_slug":"adhesives-and-compounds"},{"primary":"Cladding","primary_slug":"cladding"},{"primary":"Electronic Systems","primary_slug":"electronic-systems"},{"primary":"Exterior & Landscape","primary_slug":"exterior-and-landscape"},{"primary":"Flooring","primary_slug":"flooring"},{"primary":"Hardware","primary_slug":"hardware"},{"primary":"Heating, Ventilation & Air Con.","primary_slug":"heating-ventilation-and-air-con."},{"primary":"Insulation","primary_slug":"insulation"},{"primary":"Interiors, Furnishings & Equipment","primary_slug":"interiors-furnishings-and-equipment"},{"primary":"Kitchen & Bathroom","primary_slug":"kitchen-and-bathroom"},{"primary":"Lighting & Electrical","primary_slug":"lighting-and-electrical"},{"primary":"Metal, Timber & Plastics","primary_slug":"metal-timber-and-plastics"},{"primary":"Paint & Coatings","primary_slug":"paint-and-coatings"},{"primary":"Plumbing, Drainage & Gas","primary_slug":"plumbing-drainage-and-gas"},{"primary":"Roofing","primary_slug":"roofing"},{"primary":"Security, Fire & Safety","primary_slug":"security-fire-and-safety"},{"primary":"Stairs & Transport Systems","primary_slug":"stairs-and-transport-systems"},{"primary":"Structure & Connectors","primary_slug":"structure-and-connectors"},{"primary":"Wall Coverings","primary_slug":"wall-coverings"},{"primary":"Wall Linings, Ceilings & Partitions","primary_slug":"wall-linings-ceilings-and-partitions"},{"primary":"Waterproofing","primary_slug":"waterproofing"},{"primary":"Windows, Doors & Glazing","primary_slug":"windows-doors-and-glazing"}];
	$scope.articleChoose = new Array();

	$scope.init = function(){
		
		if(JSON.parse(sessionStorage.getItem('product'))){
	    	$scope.articleChoose = JSON.parse(sessionStorage.getItem('product'));
	    }
	};

	$scope.searchProduct = function(){
		$http.get('https://api.productspec.net/api/search?search=' + $scope.value, {
		    headers: {'Authorization': 'Basic ZmRMVVFOZ0huNDc3Ong=' }
		})
		.success(function(data) {
		    $scope.product = data;
		})
		.error(function(status) {
		    //your code when fails
		});
	};

	$scope.catFilter = function(cat){
		$http.get('https://api.productspec.net/api/search/?primary=' + cat, {
		    headers: { 'Authorization': 'Basic ZmRMVVFOZ0huNDc3Ong=' }
		})
		.success(function(data) {
		    $scope.product = data;
		})
		.error(function(status) {
		    //your code when fails
		});
	};

	$scope.addArticle = function(prod){
		$scope.articleChoose.push(prod);
	};

	$scope.removeProduct = function(prod){
		for (var i = 0; i < $scope.articleChoose.length; i++) {
			if($scope.articleChoose[i].product_slug == prod.product_slug){
				$scope.articleChoose.splice(i, 1);
				console.log($scope.articleChoose);
			}

		};
	};

	$scope.save = function(){
		sessionStorage.setItem('product', JSON.stringify($scope.articleChoose));
		$location.path("/workspace");
	};
}]);