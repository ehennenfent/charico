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
      //withdrawFunds();
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
    var questionPointer = 0;
    var answerPointer = 0;
    var answerCounter = 1;
    var offset = 7;
    $scope.questions = [
    'Do you like to give to charities in America or abroad?',
        'Do you like to support those who are currently less fortunate or fight for the future?',
            'Would you rather give legal or material assistance?',
            'Do you want to fight for legal changes or revitalize our economy?',
        'Would you rather provide material assistance or focus on building the future?',
            'Would you rather provide sustenance or medical care?',
            'Would you rather provide economic help or fight for human rights?'
    ];
    $scope.answers = [
        'America',
            'Present',
                'Legal', // 2 -> 0
                'Material', // 3 -> 1
            'Future',
                'Legal', // 5 -> 2
                'Economic', // 6 -> 3
        'Abroad',
            'Material',
                'Sustenance', // 9 -> 4
                'Medical Care', // 10-> 5
            'Future',
                'Economic', // 12 -> 6
                'Human Rights' // 13 -> 7
    ];

    $scope.$on('$ionicView.enter', function(e) {
        $scope.charity = Charities.all()[0];
    });

    $scope.bankDialog = function() {
      var alertPopup = $ionicPopup.alert({
          title: 'Who are you?',
          template: '<p>{{question}}</p> <p><button class="button button-block button-light" ng-click="num1Clicked()">{{num1}}</button></p> <p><button class="button button-block button-light" ng-click="num2clicked()">{{num2}}</button></p>',
          buttons: [{ text: 'Save',
          type: 'button-positive'}],
          scope: $scope
      });
      alertPopup.then(function(res) {
        console.log('Thank you for not eating my delicious ice cream cone');
      });
    };

    $scope.charityDialog = function() {
        $scope.question = $scope.questions[questionPointer];
        $scope.num1 = $scope.answers[answerPointer];
        $scope.num2 = $scope.answers[answerPointer + offset];

      var alertPopup = $ionicPopup.alert({
        title: 'Pick a Charity',
        template: '<p>{{question}}</p> <p ng-hide="disableButtons"><button class="button button-block button-light" ng-click="num1Clicked()">{{num1}}</button></p> <p ng-hide="disableButtons"><button class="button button-block button-light" ng-click="num2Clicked()">{{num2}}</button></p>',
        buttons: [{ text: 'Close',
        type: 'button-positive'}],
        scope: $scope
      });
      alertPopup.then(function(res) {

      });
    };

    $scope.num1Clicked = function(){
        answerCounter += 1;
        if(answerCounter == 4){
            $scope.setCharity();
            return;
        }
        questionPointer += 1;
        answerPointer += 1;
        offset = Math.floor(offset - offset/2.0);
        $scope.question = $scope.questions[questionPointer];
        $scope.num1 = $scope.answers[answerPointer];
        $scope.num2 = $scope.answers[answerPointer + offset];
    };

    $scope.num2Clicked = function(){
        answerCounter += 1;
        if(answerCounter == 4){
            answerPointer++;
            $scope.setCharity();
            return;
        }
        questionPointer += Math.ceil(offset / 2.0);
        offset = Math.floor(offset - offset/2.0);
        answerPointer += 2*(offset + 1);
        $scope.num2 = $scope.answers[answerPointer + offset];
        $scope.question = $scope.questions[questionPointer];
        $scope.num1 = $scope.answers[answerPointer];
    };

    $scope.setCharity = function(){
        var charities = Charities.all();
        var charity = charities[0];
        if(answerPointer == 2){charity = charities[0];}
        if(answerPointer == 3){charity = charities[1];}
        if(answerPointer == 5){charity = charities[2];}
        if(answerPointer == 6){charity = charities[3];}
        if(answerPointer == 9){charity = charities[4];}
        if(answerPointer == 10){charity = charities[5];}
        if(answerPointer == 12){charity = charities[6];}
        if(answerPointer == 13){charity = charities[7];}
        Charities.moveItem(charity,charities.indexOf(charity),0);
        $scope.question = 'Looks like your ideal charity is: ' + charity.name;
        $scope.disableButtons = true;
        $scope.$on('$ionicView.enter', function(e) {
            $scope.charity = Charities.all()[0];
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
