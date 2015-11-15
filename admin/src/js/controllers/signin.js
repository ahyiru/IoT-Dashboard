'use strict';

app.controller('SigninFormController', function ($rootScope, $scope, $auth, $location) {
  //$scope.user = {
  //  username: 'testamail@mail.mail',
  //  password: '123456'
  //};

  $scope.user = {};
  $scope.authError = null;

  $scope.login = function (code) {
    console.log($scope.user);
    $auth.login(code ? {code: code} : $scope.user)
      .then(function () {
        //toaster.success('You have successfully signed in');
        console.info('You have successfully signed in');
        $location.path('/');
        $rootScope.refreshAllAccountInfo();
      })
      .catch(function (response) {
        //toastr.error(response.data.message, response.status);
        $scope.authError = response.data.message;
        console.log(response.data.message);
      });
  };

  if ($auth.isAuthenticated()) {
    $location.path('/');
  }

  var code = $location.search().code;
  if ($auth.isAuthenticated() && typeof code === 'string' && code != '') {
    $scope.login(code);
  }

  $scope.authenticate = function(provider) {
   $auth.authenticate(provider)
     .then(function() {
       //toaster.success('You have successfully signed in with ' + provider);
       console.info('You have successfully signed in with ' + provider);
       $location.path('/');
     })
     .catch(function(response) {
       console.error(response.data);
       $scope.authError = response.data.error;
     });
  };
});
