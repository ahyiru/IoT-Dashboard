
app.controller('DevicesController', function ($rootScope, $scope, Account) {

  $scope.unauthorizeDevice = function (id) {
    Account.unauthorizeDevice({
      deviceId: id
    }, function (response) {
      console.log('unauthorize result', response.result);
      $rootScope.refreshDevicesList();
    });
  };

});
