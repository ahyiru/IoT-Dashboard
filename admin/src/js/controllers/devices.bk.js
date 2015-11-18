
app.controller('DevicesController', function ($rootScope, $scope, $http, Account) {

  $scope.unauthorizeDevice = function (id) {
    Account.unauthorizeDevice({
      deviceId: id
    }, function (response) {
      console.log('unauthorize result', response.result);
      $rootScope.refreshDevicesList();
    });
  };

	$scope.gridOptions={
		//rowHeight: 36,
		//enableSorting:true,
		//enableFiltering: false,

		//showGridFooter: true,
		//enableGridMenu: true,

		enableHorizontalScrollbar:1,//uiGridConstants.scrollbars.NEVER,
		enableVerticalScrollbar:1,//uiGridConstants.scrollbars.NEVER,

		enablePaging: true,
		paginationPageSizes: [10, 20, 50],
		paginationPageSize: 10,
		paginationCurrentPage: 1,
		//pagingOptions: $scope.pagingOptions,

		columnDefs:[
			{name:'浏览器',field:'browser'},
			{name:'engine',displayName:'引擎'},
			{name:'grade'},
			{name:'platform'},
			{name:'version'},
			{name:'edit',enableFiltering: false,width:80, enableCellEdit: true, cellTemplate: '<div class="ui-grid-cell-contents ebtn"><button class="btn btn-info"><i class="fa fa-pencil-square-o"></i></button></div>'},
			{name:'delete',enableFiltering: false,width:80, enableCellEdit: true, cellTemplate: '<div class="ui-grid-cell-contents dbtn"><button class="btn btn-danger"><i class="fa fa-trash-o"></i></button></div>'}
		],

		onRegisterApi:function(gridApi){
			$scope.gridApi=gridApi;
		}
	};

	$http.get('api/datatable.json').then(function(data){
		//console.log(data.data.aaData);
		/*angular.forEach(data.aaData,function(data,index){

		})*/

		$scope.gridOptions.data=data.data.aaData;
	})
	.catch(function(msg){
		console.error(msg);
	});

});


// modal 

  app.controller('ModalInstanceCtrl', ['$scope', '$modalInstance', 'data', function($scope, $modalInstance, data) {
    $scope.data = data;

    $scope.ok = function () {
      $modalInstance.close($scope.data);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }]); 
  app.controller('myModal', ['$scope', '$modal', '$log', function($scope, $modal, $log) {
    $scope.data = {};
    $scope.open = function (size) {
      var modalInstance = $modal.open({
        templateUrl: 'myModalContent.html',
        controller: 'ModalInstanceCtrl',
        size: size,
        resolve: {
          data: function () {
            return $scope.data;
          }
        }
      });

      modalInstance.result.then(function (data) {
      	console.log(data);
        ddata = data;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };
  }]); 

  //  server

 // app.factory('ddata',function(){return {};})