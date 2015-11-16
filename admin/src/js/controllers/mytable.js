// tab controller
app.controller('mytable',  function($scope,$http) {
	$scope.gridOptions={
		/*enableSorting:true,
		columnDefs:[
			{name:'browser'},
			{name:'engine'},
			{name:'grade'},
			{name:'platform'},
			{name:'version'}
		],
		onRegisterApi:function(){
			$scope.mygridApi=gridApi;
		}*/
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