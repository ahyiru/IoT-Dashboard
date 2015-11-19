
app.controller('DevicesController', function ($rootScope, $scope, $http, $modal, Account) {

  $scope.unauthorizeDevice = function (id) {
    Account.unauthorizeDevice({
      deviceId: id
    }, function (response) {
      console.log('unauthorize result', response.result);
      $rootScope.refreshDevicesList();
    });
  };

	$http.get('api/datatable.json').then(function(data){
	    var data=data.data.aaData;
	    mytable(data);
	    var tr=$('.mytable tbody>tr');
	    $scope.currentPage=1;
	    
	    var showpg=function(cp,val){
	    	mysch(tr,val);
	    	var mtr=$('.mytable tbody>tr.match');
	      var trl=mtr.length;console.log(trl);
	      $scope.totalItems=trl;
	      trl>=50?$scope.maxSize=5:(trl%10==0?$scope.maxSize=~~(trl/10):$scope.maxSize=~~(trl/10)+1);
	      $scope.maxSize=$scope.maxSize||1;

	      tr.hide();
	      if(trl>10){
		    var cp=cp*10;
		    for(var i=0;i<10;i++){
		      mtr.eq(cp-i).show();
		    }
	      }
	      else{
	      	mtr.show();
	      }
	    };

	    var mysch=function(tr,sval){
			var reg=new RegExp(sval,'i');
	    	tr.each(function(){
	    	  var f=true;
	          $(this).find('>td').each(function(){
	            var str=$.trim($(this).text());
	            if(reg.test(str)){
	              f=true;
	              return false;
	            }
	            else{
	              f=false;
	            }
	          })
	          if(f) $(this).addClass('match');
	          else $(this).removeClass('match');
	    	});
	    }

	    $scope.setPage = function (pageNo) {
	      $scope.currentPage = pageNo;
	    };

	    $scope.pageChanged = function() {
	      console.log('Page changed to: ' + $scope.currentPage);
	    };

	    $scope.$watch('currentPage',function(n,o){
	    	var val=$scope.mysch;
	      	showpg(n,val);
	    });
	    $scope.$watch('mysch',function(n,o){
	    	var cp=$scope.currentPage;
	      	showpg(cp,n);
	    });

	    // modal
	    var edit=$('.mytable .ebtn');
	    edit.each(function(){
	    	$(this).on('click',function(){
	    		var td=$(this).parent().parent().find('td'),tdv=[];
	    		for(var i=0;i<td.length-2;i++){
	    			tdv[i]=td.eq(i).text();
	    		}
	    		$scope.data=tdv;
	    		var modalInstance = $modal.open({
			        templateUrl: 'myEditModal.html',
			        controller: 'ModalInstanceCtrl',
			        resolve: {
			          data: function () {
			            return $scope.data;
			          }
			        }
			      });

			      modalInstance.result.then(function (data) {
			        ddata = data;
			      }, function () {
			        console.info('Modal dismissed at: ' + new Date());
			    });
	    	})
	    });

	    var del=$('.mytable .dbtn');
	    del.each(function(){
	    	$(this).on('click',function(){
	    		var did=$(this).parent().parent().find('td').eq(0).text();
	    		$scope.data=did;
	    		var modalInstance = $modal.open({
			        templateUrl: 'myEditModal.html',
			        controller: 'ModalInstanceCtrl',
			        resolve: {
			          data: function () {
			            return $scope.data;
			          }
			        }
			      });

			      modalInstance.result.then(function (data) {
			        ddata = data;
			      }, function () {
			        console.info('Modal dismissed at: ' + new Date());
			    });
	    	})
	    });

	})
	.catch(function(msg){
		console.error(msg);
	});


});


// modal 

  app.controller('ModalInstanceCtrl', ['$scope', '$modalInstance', 'data', function($scope, $modalInstance, data) {
    $scope.data = data;
    console.log(data);
    $scope.ok = function () {
      $modalInstance.close($scope.data);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }]);
  //add
  app.controller('addModal', function($scope, $modal) {
    $scope.data = [];
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
        console.info('Modal dismissed at: ' + new Date());
      });
    };
  });
  //edit
  app.controller('myModal', function($scope, $modal) {
    /*$scope.data = {};
    var tempUrl='myDelModal.html';

    var edit=$('.mytable .ebtn');console.log(edit.length)
    edit.each(function(){
    	$(this).on('click',function(){
    		var tr=$(this).parent().parent(),tdv=[];
    		for(var i=0;i<tr.length-2;i++){
    			tdv[i]=tr.find('td').eq(i).text();
    		}
    		console.log(tdv);
    	})
    })*/

    /*$scope.open = function (size) {

    	console.log($(this));

      var modalInstance = $modal.open({
        templateUrl: tempUrl,
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
        console.info('Modal dismissed at: ' + new Date());
      });
    };*/
  });
  /*//delete
  app.controller('myModal', function($scope, $modal) {
    $scope.data = {};
    $scope.open = function (size) {
      var modalInstance = $modal.open({
        templateUrl: 'myDelModal.html',
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
        console.info('Modal dismissed at: ' + new Date());
      });
    };
  });*/

  //  server

 // app.factory('ddata',function(){return {};})

 /*****************************************/

 var mytable=function(d){
    var thv=''
    var trl=d.length,trv='';
    for(var i=0;i<trl;i++){
      var td=ota(d[i])[0],tdl=td.length,tdv='';
      for(var j=0;j<tdl;j++){
        if(i==0){
          thv+='<th>'+ota(d[i])[0][j]+'</th>';
        }
        tdv+='<td>'+ota(d[i])[1][j]+'</td>'
      }
      trv+='<tr>'+tdv+'<td><button class="btn btn-info ebtn"><i class="fa fa-pencil-square-o"></i></button></td><td><button class="btn btn-danger dbtn"><i class="fa fa-trash-o"></i></button></td></tr>'
    }
    thv+='<th>编辑</th><th>删除</th>';
    var search='<div id="mysch"><input type="text" placeholder="search..."></div>'
    var tab='<table class="table table-striped table-hover b-t b-light"><thead><tr>'+thv+'</tr></thead><tbody>'+trv+'</tbody></table>';
    $('.mytable').append(tab);
    //mysch();
  }

  var ota=function(obj){
    var keys=[],values=[];
    for(var i in obj){
      keys.push(i);
      values.push(obj[i]);
    }
    return [keys,values];
  }

  /*var myfilter=function(val,str){
    var reg=new RegExp(val,'i');
    return reg.test(str);
  }

  var mysch=function(){
    $('#mysch').on('input',function(){
      var that=$(this);
      setTimeout(tt,300);
      function tt(){
        var val=$.trim(that.val());
        $('.mytable tbody>tr').each(function(){
          var f=true;
          $(this).find('>td').each(function(){
            var str=$.trim($(this).text());
            if(myfilter(val,str)){
              f=true;
              return false;
            }
            else{
              f=false;
            }
          })
          if(f) $(this).show();
          else $(this).hide();
        })
      }
    })
  }*/