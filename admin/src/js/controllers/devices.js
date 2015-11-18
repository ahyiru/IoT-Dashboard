
app.controller('DevicesController', function ($rootScope, $scope, $http, Account) {

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
    $scope.totalItems=tr.length;
    data.length>=50?$scope.maxSize=5:($scope.totalItems%10==0?$scope.maxSize=~~($scope.totalItems/10):$scope.maxSize=~~($scope.totalItems/10)+1);
    
    var showpg=function(cp){
      tr.hide();
      var cp=cp*10;
      for(var i=0;i<10;i++){
        tr.eq(cp-i).show();
      }
    }

    $scope.setPage = function (pageNo) {
      $scope.currentPage = pageNo;
    };

    $scope.pageChanged = function() {
      console.log('Page changed to: ' + $scope.currentPage);
    };

    $scope.$watch('currentPage',function(n,o){
      showpg(n);
    });


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
    mysch();
  }

  var ota=function(obj){
    var keys=[],values=[];
    for(var i in obj){
      keys.push(i);
      values.push(obj[i]);
    }
    return [keys,values];
  }

  var myfilter=function(val,str){
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
  }