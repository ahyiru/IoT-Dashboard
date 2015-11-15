/**
 * Project: my.locker.fm
 * User: Andrey Semerun <andrey.semerun@gmail.com>
 * Date: 2015-10-08
 * Time: 19:48
 */

app.directive('gravatar', function() {
  return {
    restrict: 'AE',
    replace: true,
    scope: {
      name: '@',
      height: '@',
      width: '@',
      emailHash: '@'
    },
    link: function(scope, el, attr) {
      scope.defaultImage = 'identicon';
    },
    template: '<img alt="{{ name }}" height="{{ height }}"  width="{{ width }}" src="img/usr.jpg">'
  };
});