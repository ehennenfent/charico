function Total($scope, $http, name, $rootScope) {
  var total = 0;
  $http.get('http://api.reimaginebanking.com/customers?key=daa76d612ba3bbf96b4a634a3d751ca2')
  .success(function(customers) {
    for (var i = 0; i < customers.length; i++) {
      var customer = customers[i];
      if (customer.last_name === name) {
        $http.get('http://api.reimaginebanking.com/customers/' + customer._id + '/accounts?key=daa76d612ba3bbf96b4a634a3d751ca2')
        .success(function(accounts) {
          for (var j = 0; j < accounts.length; j++) {
            var account = accounts[j];
            total += account.balance;
          }
          $rootScope.total = total;
      });
      }
    }
  });
}

function Deposits($scope, $http, name, $rootScope) {
  var sum = 0;
  var user = Parse.User.current();
  user.fetch();
  $http.get('http://api.reimaginebanking.com/customers?key=daa76d612ba3bbf96b4a634a3d751ca2')
  .success(function(customers) {
    for (var i = 0; i < customers.length; i++) {
      var customer = customers[i];
      if (customer.last_name === name) {
        $http.get('http://api.reimaginebanking.com/customers/' + customer._id + '/accounts?key=daa76d612ba3bbf96b4a634a3d751ca2')
        .success(function(accounts){
          for (var j = 0; j < accounts.length; j++) {
            var partsum = 0;
            var account = accounts[j];
            $http.get('http://api.reimaginebanking.com/accounts/' + account._id + '/deposits?key=daa76d612ba3bbf96b4a634a3d751ca2')
            .success(function(deposits) {
              for (var k = 0; k < deposits.length; k++) {
                var deposit = deposits[k];
                console.log(deposit);
                if (new Date(deposit.transaction_date) > new Date().setMonth(new Date().getMonth() - 1)) {
                  partsum += deposit.amount;
                }
              }
              sum += partsum;
              var donations = user.get('month_donations');
              console.log(donations);
              $rootScope.monthPercentage = Math.floor(donations / (user.get('percentage') / 100 * sum) * 100);
              $rootScope.deposits = sum;
              $rootScope.donations = donations;
          });
          }

      });
      }
    }
  });
}

function Withdraw($scope, $http, name, amount, nickname) {
  var sum = 0;
  $http.get('http://api.reimaginebanking.com/customers?key=daa76d612ba3bbf96b4a634a3d751ca2')
  .success(function(customers) {
    for (var i = 0; i < customers.length; i++) {
      var customer = customers[i];
      if (customer.last_name === name) {
        $http.get('http://api.reimaginebanking.com/customers/' + customer._id + '/accounts?key=daa76d612ba3bbf96b4a634a3d751ca2')
        .success(function(accounts) {
          for (var j = 0; j < accounts.length; j++) {
            var account = accounts[j];
            if (account.nickname === nickname) {
              $http.post('http://api.reimaginebanking.com/accounts/' + account._id + '/purchases?key=daa76d612ba3bbf96b4a634a3d751ca2&id=' + customer._id,
                         {merchant_id: "charico",
                          medium: "balance",
                          purchase_date: new Date().toString(),
                          amount: amount,
                          status: "pending",
                          description: "donation"
                         })
            }
          }
      });
      }
    }
  });
}
