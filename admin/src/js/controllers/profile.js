/**
 * Project: my.locker.fm
 * User: Andrey Semerun <andrey.semerun@gmail.com>
 * Date: 2015-10-08
 * Time: 14:28
 */

app.controller('ProfileController', function ($rootScope, md5) {
  $rootScope.md5 = md5.createHash;
});