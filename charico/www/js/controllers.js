angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('CharitiesCtrl', function($scope, Charities) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.charities = Charities.all();
  $scope.remove = function(charity) {
    Charities.remove(charity);
  };
})

.controller('CharityDetailCtrl', function($scope, $stateParams, Charities) {
  $scope.charity = Charities.get($stateParams.charityId);
})

.controller('TotalCtrl', function($scope, $http) {
    $scope.total = Total($scope, $http);
})

.controller('AccountCtrl', function($scope) {
  $scope.percentage = 15;
});
