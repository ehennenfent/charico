function Total($scope, $http) {
  var total = 0;
  $http.get('http://api.reimaginebanking.com/accounts?key=daa76d612ba3bbf96b4a634a3d751ca2')
  .success(function(accounts) {
    for (var i = 0; i < accounts.length; i++) {
      var account = accounts[i];
      $http.get('http://api.reimaginebanking.com/accounts/' + account._id + '/deposits?key=daa76d612ba3bbf96b4a634a3d751ca2').success(function(deposits) {
        for (var deposit in deposits) {
          var d1 = new Date(newDate().toJSON.slice(0,10).setMonth(new Date().toJSON.slice(0,10).getMonth()-1));
          var d2 = new Date(deposit.date);
          if (d2 > d1) {
            total += deposit.amount;
          }
        }
      });
    }
  });
  return total;
}
