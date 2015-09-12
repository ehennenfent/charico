function Total($scope, $http, name) {
  var total = 0;
  $http.get('http://api.reimaginebanking.com/customers?key=daa76d612ba3bbf96b4a634a3d751ca2')
  .success(function(customers) {
    for (var i = 0; i < customers.length; i++) {
      var customer = customers[i];
      if (customer.last_name === name) {
        $http.get('http://api.reimaginebanking.com/customers/' + customer._id + '/accounts?key=daa76d612ba3bbf96b4a634a3d751ca2')
        .success(function(accounts)) {
          for (var j = 0; j < accounts.length; j++) {
            var account = accounts[j];
            total += account.balance;
          }
        }
      }
    }
  });
  return total;
}
