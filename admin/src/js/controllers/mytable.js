// tab controller

app.controller('mytable',  function($scope,$http) {
	/*$scope.pagingOptions = {
        pageSizes: [10, 20, 50],
        pageSize: 10,
        currentPage: 1
    }; */
	$scope.gridOptions={
		//rowHeight: 36,
		//enableSorting:true,
		//enableFiltering: false,

		//showGridFooter: true,
    	//enableGridMenu: true,

    	enableHorizontalScrollbar:0,//uiGridConstants.scrollbars.NEVER,
    	enableVerticalScrollbar:0,//uiGridConstants.scrollbars.NEVER,

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
			{name:'edit',enableFiltering: false,width:100, enableCellEdit: true, cellTemplate: '<a href="#">编辑</a>'},
			{name:'delete',enableFiltering: false,width:100, enableCellEdit: true, cellTemplate: '<a href="#">删除</a>'}
		],

		onRegisterApi:function(gridApi){
			$scope.gridApi=gridApi;
		}
	};

  $http.get('api/datatable.json').then(function(data){
  	console.log(data.data.aaData);
  	/*angular.forEach(data.aaData,function(data,index){

  	})*/
  
  	$scope.gridOptions.data=data.data.aaData;
  })
  .catch(function(msg){
  	console.error(msg);
  })
});