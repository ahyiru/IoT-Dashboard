

app.controller('LogoutController', function ($auth, $location) {
  $auth.logout();
  $location.path('/login');
});
