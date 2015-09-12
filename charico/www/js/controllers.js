angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $http, $rootScope) {
    $scope.$on('$ionicView.enter', function(e) {
        Deposits($scope, $http, "Rousey", $rootScope);
    });
})

.controller('CharitiesCtrl', function($scope, Charities) {

  $scope.data = {};

  $scope.charities = Charities.all();

  $scope.remove = function(charity) {
    Charities.remove(charity);
  };
  $scope.moveItem = function(item, fromIndex, toIndex) {
    $scope.charities = Charities.moveItem(item, fromIndex, toIndex);
  };

  $scope.data.reorderable = false;

  $scope.makeDonation = function(charity, amount){
      var user = Parse.User.current();
      user.set('month_donations', user.get('month_donations') + amount);
      user.save();
  };

})

.controller('CharityDetailCtrl', function($scope, $stateParams, Charities) {
  $scope.charity = Charities.get($stateParams.charityId);
})

.controller('TotalCtrl', function($scope, $http, $rootScope) {
    Total($scope, $http, "Rousey", $rootScope);
    Deposits($scope, $http, "Rousey", $rootScope);
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
        $scope.data.percentage = '15';
    }

    $scope.storeParseUser = function(){
        console.log("Button Clicked");
        if(firstTime){
            var user = new Parse.User();
            user.set('username', $scope.data.fullName.replace(' ',''));
            user.set('password', $scope.data.apiKey);
            user.set('percentage',$scope.data.percentage);
            user.set('month_donations',0);
            user.save();

            user.signUp().then(function(user){
                window.localStorage.setItem("percentage",$scope.data.percentage);
                window.localStorage.setItem("apiKey",$scope.data.apiKey);
                window.localStorage.setItem("fullName",$scope.data.fullName);
                window.localStorage.setItem("firstTime",'false');
                console.log($scope.data.fullName + " Signed up Successfully");
            }, function(error){console.log(error);});
        }
        else{
            Parse.User.logIn(window.localStorage.getItem('fullName').replace(' ',''),window.localStorage.getItem('apiKey')).then(function(user){
                console.log($scope.data.fullName + " Logged in successfully.");
            }, function(error){
                console.log($scope.data.fullName + " Login error! " + error);
            });
        }
    };

});
