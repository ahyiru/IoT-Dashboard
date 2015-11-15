
app.factory('User', function($resource) {
  var baseUrl = '/dashboard/users';
  return $resource(baseUrl + '/:id', {

  }, {
    count: {
      method: 'GET',
      url: baseUrl + '/count'
    },
    countTrial: {
      method: 'GET',
      url: baseUrl + '/count',
      params: {
        accountType: 0,
        expirationDate: {
          $gt: parseInt(Date.now() / 1000)
        }
      }
    },
    countTrialExpired: {
      method: 'GET',
      url: baseUrl + '/count',
      params: {
        accountType: 0,
        expirationDate: {
          $lt: parseInt(Date.now() / 1000)
        }
      }
    },
    countPaid: {
      method: 'GET',
      url: baseUrl + '/count',
      params: {
        accountType: 1,
        expirationDate: {
          $gt: parseInt(Date.now() / 1000)
        }
      }
    },
    countExpired: {
      method: 'GET',
      url: baseUrl + '/count',
      params: {
        accountType: 1,
        expirationDate: {
          $lt: parseInt(Date.now() / 1000)
        }
      }
    },
    countPromo: {
      method: 'GET',
      url: baseUrl + '/count',
      params: {
        accountType: 2
      }
    },
    countApple: {
      method: 'GET',
      url: baseUrl + '/count/provider',
      params: {
        provider: 'apple'
      }
    },
    countPaypal: {
      method: 'GET',
      url: baseUrl + '/count/provider',
      params: {
        provider: 'paypal'
      }
    },
    countStripe: {
      method: 'GET',
      url: baseUrl + '/count/provider',
      params: {
        provider: 'stripe'
      }
    },
    countCoppertino: {
      method: 'GET',
      url: baseUrl + '/count/provider',
      params: {
        provider: 'coppertino'
      }
    },
    countYear: {
      method: 'GET',
      url: baseUrl + '/count',
      params: {
        expirationDate: {
          $gt: parseInt(Date.now() / 1000)
        },
        subscriptionPeriod: 'year'
      }
    },
    countMonth: {
      method: 'GET',
      url: baseUrl + '/count',
      params: {
        expirationDate: {
          $gt: parseInt(Date.now() / 1000)
        },
        subscriptionPeriod: 'month'
      }
    },
    countCanceled: {
      method: 'GET',
      url: baseUrl + '/count',
      params: {
        accountType: 1,
        subscriptionPeriod: ''
      }
    },
    countAppleExpired: {
      method: 'GET',
      url: baseUrl + '/count',
      params: {
        accountType: 1,
        isAppleSubscription: true,
        expirationDate: {
          $lt: parseInt(Date.now() / 1000)
        }
      }
    },
    countHasTracks: {
      method: 'GET',
      url: baseUrl + '/count',
      params: {
        hasTracks: true
      }
    },
    countDoesNotHasTracks: {
      method: 'GET',
      url: baseUrl + '/count',
      params: {
        hasTracks: false
      }
    }
  });
});
