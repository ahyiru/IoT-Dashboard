'use strict';

// signup controller
app.controller('SignupFormController', function($rootScope, $scope, $auth, $location) {
    $scope.user = {};
    $scope.authError = null;
    
    $scope.signup = function () {console.log($scope.user)
      $auth.signup($scope.user)
        .then(function (response) {
           $auth.setToken(response);
          //toaster.success('You have successfully signed in');
          console.info('You have successfully signed in');
          $location.path('/');
          $rootScope.refreshAllAccountInfo();
        })
        .catch(function (response) {
          $scope.authError = response.data.error;
        });
    };
  })
 ;