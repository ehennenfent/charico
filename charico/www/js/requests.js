function Total($scope, $http) {
  var total = 0
  $http.get('http://api.reimaginebanking.com/accounts?key=daa76d612ba3bbf96b4a634a3d751ca2')
  success(function(accounts) {
    for (account in accounts) {
      $http.get(concat('http://api.reimaginebanking.com/accounts/', account._id, '/deposits?key=daa76d612ba3bbf96b4a634a3d751ca2'))
      success(function(deposits) {
        for (deposit in deposits) {
          total += deposit.amount
        }
      })
    }
  })
  $scope.total = total
}
