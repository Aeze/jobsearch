var app = angular.module('cosmop', ['ui.bootstrap','ngResource']);

app.config(["$httpProvider", function(provider) {
  provider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
}]);

app.factory('Jobs', function($resource) {
  return $resource("/jobs/:id", {id: "@id"}, {update: {method: "PUT"}});
});

app.filter('startFrom', function() {
    return function(input, start) {
        if(input) {
start = +start; //parse to int
return input.slice(start);
}
return [];
}
});


var JobsCtrl = function($scope, $timeout, Jobs) {

	 var list = Jobs.query(function() {
	 	$scope.list = list;
	 	$scope.currentPage = 1; //current page
    $scope.maxSize = 5; //pagination max size
    $scope.entryLimit = 5; //max rows for data table
    var initializing = true;

    /* init pagination with $scope.list */
    $scope.noOfPages = Math.ceil($scope.list.length/$scope.entryLimit);
    $scope.setPage = function(pageNo) {
        $scope.currentPage = pageNo;
    };

    $scope.$watch('search', function() {
    	if(initializing) {
    		 $timeout(function() { initializing = false; });
    	} else {
    		$scope.noOfPages = Math.ceil($scope.filteredList.length/$scope.entryLimit);
    	}
    });

	 });


}

app.directive('map', function($timeout){

	return {
		restrict: 'E',
		template: "<div id='map'></div>",
		link: function(scope, element, attrs) {
			var map = L.mapbox.map('map', 'examples.map-uci7ul8p').setView([40, -74.50], 9);

	    document.getElementById('map-navigation').onclick = function(e) {
		    var pos = e.target.getAttribute('data-position');
		    if (pos) {
		        var loc = pos.split(',');
		        map.setView(loc, 11);
		    }
			};
			var loading = true;
			scope.$watch(attrs.ngModel, function(data) {
				console.log(data);
				if(loading) {
    		 $timeout(function() { loading = false; });
    		} else {
					for(var i=0;i<data.length;i++){
						console.log(data[i].latitude);
						var lat = data[i].latitude;
						var lon = data[i].longitude;
						L.mapbox.markerLayer({
					    // this feature is in the GeoJSON format: see geojson.org
					    // for the full specification
					    type: 'Feature',
					    geometry: {
					        type: 'Point',
					        // coordinates here are in longitude, latitude order because
					        // x, y is the standard for GeoJSON and many formats
					        coordinates: [lon, lat]
					    },
					    properties: {
					        title: 'A Single Marker',
					        description: 'Just one of me',
					        // one can customize markers by adding simplestyle properties
					        // http://mapbox.com/developers/simplestyle/
					        'marker-size': 'large',
					        'marker-color': '#f0a'
					    }
						}).addTo(map);
					}
    		}
			});
		}
	};
});
