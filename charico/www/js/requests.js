function Total($scope, $http) {
  var total = 0;
  $http.get('http://api.reimaginebanking.com/accounts?key=daa76d612ba3bbf96b4a634a3d751ca2')
  .success(function(accounts) {
    for (var i = 0; i < accounts.length; i++) {
        var account = accounts[i];
      $http.get('http://api.reimaginebanking.com/accounts/' + account._id + '/deposits?key=daa76d612ba3bbf96b4a634a3d751ca2').success(function(deposits) {
        for (var deposit in deposits) {
          total += deposit.amount;
        }
    });
    }
});
return total;
}
