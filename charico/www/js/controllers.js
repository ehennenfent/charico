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
    var firstTime = (window.localStorage.getItem("firstTime") != 'false');
    $scope.data = {};

    if(!firstTime){
        $scope.data.percentage = window.localStorage.getItem("percentage");
        $scope.data.apiKey = window.localStorage.getItem("apiKey");
        $scope.data.fullName = window.localStorage.getItem("fullName");
    }
    else{
        $scope.data.percentage = 15;
    }

    $scope.storeParseUser = function(){
        console.log("Button Clicked");
        if(firstTime){
            var user = new Parse.User();
            user.set('username', $scope.data.fullName.replace(' ',''));
            user.set('password', $scope.data.apiKey);
            user.set('percentage',$scope.data.percentage);

            user.signUp().then(function(user){
                window.localStorage.setItem("percentage",$scope.data.percentage);
                window.localStorage.setItem("apiKey",$scope.data.apiKey);
                window.localStorage.setItem("fullName",$scope.data.fullName);
                window.localStorage.setItem("firstTime",'false');
                console.log($scope.data.fullName + " Signed up Successfully");
            }, function(error){console.log(error);});
        }
        else{
            Parse.User.logIn(window.localStorage.getItem('fullName'),window.localStorage.getItem('apiKey')).then(function(user){
                console.log($scope.data.fullName + " Logged in successfully.");
            }, function(error){
                console.log($scope.data.fullName + " Login error! " + error);
            });
        }
    };

});
