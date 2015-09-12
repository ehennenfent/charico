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
    $scope.total = Total($scope, $http, "Rousey");
})

.controller('AccountCtrl', function($scope) {
    var firstTime = (window.localStorage.getItem("firstTime") != 'false');

    console.log(firstTime);
    if(!firstTime){
        $scope.percentage = window.localStorage.getItem("percentage");
        $scope.apiKey = window.localStorage.getItem("apiKey");
        $scope.fullName = window.localStorage.getItem("fullName");
    }
    else{
        $scope.percentage = 15;
    }

    $scope.storeParseUser = function(){
        console.log("Button Clicked");
        if(firstTime){
            var user = new Parse.user();
            user.set('username', $scope.fullName.replace(' ',''));
            user.set('password', $scpoe.apiKey);
            user.set('percentage',$scope.percentage);

            user.signUp().then(function(user){
                window.localStorage.setItem("percentage",$scope.percentage);
                window.localStorage.setItem("apiKey",$scope.apiKey);
                window.localStorage.setItem("fullName",$scope.fullName);
                window.localStorage.setItem("firstTime",'false');
                console.log($scope.fullName + " Signed up Successfully");
            }, function(error){console.log(error);});
        }
        else{
            Parse.User.logIn(window.localStorage.getItem('fullName'),window.localStorage.getItem('apiKey')).then(function(user){
                console.log($scope.fullName + " Logged in successfully.");
            }, function(error){
                console.log($scope.fullName + " Login error! " + error);
            });
        }
    };

});
