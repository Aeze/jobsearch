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
    $scope.list = Jobs.query(function() {
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