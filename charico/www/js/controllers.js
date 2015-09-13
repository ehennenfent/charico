angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $http, $rootScope) {
    $scope.$on('$ionicView.enter', function(e) {
        Deposits($scope, $http, "Rousey", $rootScope);
    });
})

.controller('CharitiesCtrl', function($scope, Charities, $ionicPopup) {

     $scope.data = {};

    $scope.donationDialog = function(charity) {
      var alertPopup = $ionicPopup.alert({
        title: charity.name,
        template: '<span style="margin-left: auto; margin-right: auto; display: block; width: 60%">$<input type="number" ng-model="data.amount" style="width: 85%; display: inline"/></span>',
        buttons: [{ text: 'Donate',
        type: 'button-positive'}],
        scope: $scope
      });
      alertPopup.then(function(res) {
        $scope.makeDonation(charity, $scope.data.amount);
      });
    };

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

.controller('AccountCtrl', function($scope, Charities, $ionicPopup) {
    $scope.$on('$ionicView.enter', function(e) {
        $scope.charity = Charities.all()[0];
    });

    $scope.bankDialog = function() {
      var alertPopup = $ionicPopup.alert({
        title: 'Who are you?',
        template: 'It might taste good'
      });
      alertPopup.then(function(res) {
        console.log('Thank you for not eating my delicious ice cream cone');
      });
    };

    $scope.charityDialog = function() {
      var alertPopup = $ionicPopup.alert({
        title: 'Pick a Charity',
        template: 'It might taste good'
      });
      alertPopup.then(function(res) {

      });
    };

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

            user.signUp().then(function(user){
                window.localStorage.setItem("percentage",$scope.data.percentage);
                window.localStorage.setItem("apiKey",$scope.data.apiKey);
                window.localStorage.setItem("fullName",$scope.data.fullName);
                window.localStorage.setItem("firstTime",'false');
                console.log($scope.data.fullName + " Signed up Successfully");
            }, function(error){console.log(error);});
        }
        else{
            Parse.User.logIn($scope.data.fullName.replace(' ',''),$scope.data.apiKey).then(function(user){
                console.log($scope.data.fullName + " Logged in successfully.");
            }, function(error){
                console.log($scope.data.fullName + " Login error! " + error);
            });
        }
    };

});
