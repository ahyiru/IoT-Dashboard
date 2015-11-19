
app.factory('Account', function ($resource, API_BASE_URL) {
  var baseUrl = API_BASE_URL + '/account';
  return $resource('/', {
    //api_key: 'test_api-key'
  }, {
    info: {
      method: 'GET',
      url: '/api/me'
    },
    devices: {
      method: 'GET',
      url: '/devices',
      isArray: true
    },
    unauthorizeDevice: {
      method: 'POST',
      url: '/devices/unauthorize'
    },
    upgrade: {
      method: 'POST',
      url: '/upgrade'
    }
  });
/*var baseUrl = API_BASE_URL + 'json/data.json';
  return $resource(baseUrl, {
    //api_key: 'test_api-key'
  }, {
    info: {
      method: 'GET',
      url: baseUrl
    },
    devices: {
      method: 'GET',
      url: baseUrl
    },
    unauthorizeDevice: {
      method: 'POST',
      url: baseUrl + '/devices/unauthorize'
    },
    upgrade: {
      method: 'POST',
      url: baseUrl + '/upgrade'
    }
  });*/
});

