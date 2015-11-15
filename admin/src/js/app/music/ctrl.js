
app.controller('MusicCtrl', ['$sce', '$scope', '$http', '$state', function ($sce, $scope, $http, $state) {    
    $scope.API = null;
    $scope.active = 0;
  
    $scope.currentState = $state.$current;
    $scope.state = $state;
  

     $scope.app = {
        name: 'LOCKER MUSIC',
        version: '2.0.3',
        // for chart colors
        color: {
          primary: '#7266ba',
          info:    '#23b7e5',
          success: '#27c24c',
          warning: '#fad733',
          danger:  '#f05050',
          light:   '#e8eff0',
          dark:    '#3a3f51',
          black:   '#1c2b36'
        },
        settings: {
          themeID: 1,
          navbarHeaderColor: 'bg-head',
          navbarCollapseColor: 'bg-white-only',
          asideColor: 'bg-black',
          headerFixed: true,
          asideFixed: true,
          asideFolded: false,
          asideDock: false,
          container: true,
        }
      }
      
  


    $scope.audios=[
      {
        title: "1. Lentement",
        artist:"Miaow",
        poster: "",
        sources: [
          {src: $sce.trustAsResourceUrl("http://flatfull.com/themes/assets/musics/Miaow-03-Lentement.mp3"), type: "audio/mpeg"},
          {src: $sce.trustAsResourceUrl("http://flatfull.com/themes/assets/musics/Miaow-03-Lentement.ogg"), type: "audio/ogg"}
        ]
      },
      {
        title: "2. Bubble",
        artist:"Miaow",
        poster: "",
        sources: [
          {src: $sce.trustAsResourceUrl("http://flatfull.com/themes/assets/musics/Miaow-07-Bubble.mp3"), type: "audio/mpeg"},
          {src: $sce.trustAsResourceUrl("http://flatfull.com/themes/assets/musics/Miaow-07-Bubble.ogg"), type: "audio/ogg"}
        ]
      },      
      {
        title: "3. Partir",
        artist:"Miaow",
        poster: "",
        sources: [
          {src: $sce.trustAsResourceUrl("http://flatfull.com/themes/assets/musics/Miaow-09-Partir.mp3"), type: "audio/mpeg"},
          {src: $sce.trustAsResourceUrl("http://flatfull.com/themes/assets/musics/Miaow-09-Partir.ogg"), type: "audio/ogg"}
        ]
      }
    ];

    $scope.config = {
      sources: $scope.audios[0].sources,
      title: $scope.audios[0].title,
      repeat: false,
      shuffle: false,
      autoPlay: true,
      theme: {
        url: "js/app/music/videogular.css"
      }
    };

    $scope.onPlayerReady = function(API) {
      $scope.API = API;
      if ($scope.API.currentState == 'play' || $scope.isCompleted) $scope.API.play();
      $scope.isCompleted = false;
    };

    $scope.onComplete = function() {
      $scope.isCompleted = true;
      // shuffle
      if($scope.config.shuffle){
        $scope.active = $scope.getRandom($scope.active);
      // next item
      }else{
        $scope.active++;
      }
      
      // last item
      if ($scope.active >= $scope.audios.length) {
        $scope.active = 0;
        // repeat
        if($scope.config.repeat){
          $scope.setActive($scope.active);
        }
      }else{
        $scope.setActive($scope.active);
      }
    };

    $scope.getRandom = function(index){
      var i = Math.floor( Math.random() * $scope.audios.length );
      if ( !(i-index) ){
        i = $scope.getRandom( index );
      }
      return i;
    }

    $scope.play = function(index){
      $scope.isCompleted = true;
      // get prev or next item
      index == "next" ? $scope.active++ : $scope.active--;
      if ($scope.active >= $scope.audios.length) $scope.active = 0;
      if ($scope.active == -1) $scope.active = $scope.audios.length - 1;
      // play it
      $scope.setActive($scope.active);
    };

    $scope.setActive = function(index){
      $scope.API.stop();
      $scope.config.sources = $scope.audios[index].sources;
      $scope.config.title = $scope.audios[index].title;
    };

    $scope.toggleRepeat = function(){
      $scope.config.repeat = !$scope.config.repeat;
      if ($scope.isCompleted) $scope.API.play();
    };

    $scope.toggleShuffle = function(){
      $scope.config.shuffle = !$scope.config.shuffle;
      console.log($scope.API.currentState);
      if ($scope.isCompleted) $scope.API.play();
    };


  }]
);