angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('OptionsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('RandomCtrl', function ($scope, $stateParams) {
    $scope.randomTiles = randomTiles;

    var availableIconClasses =
        ["fa-bus", "fa-bed", "fa-car",
        "fa-bolt", "fa-cloud", "fa-compass",
        "fa-gift", "fa-key", "fa-leaf",
        "fa-anchor", "fa-balance-scale", "fa-beer" ];
    $scope.tiles = [];

    function randomTiles()
    {
        var tiles = [];
        var userIndexes = [];
        //debugger;
        for(var i=0;i<3;i++)
        {
            var row = [];
            for(var j=0;j<3;j++)
            {
                var rand = 0;
                do {
                    rand = getRandomInt(0, availableIconClasses.length-1);
                } while (userIndexes.indexOf(rand) != -1);

                row.push(availableIconClasses[rand]);
                userIndexes.push(rand);
            }
            tiles.push(row);
        }

        $scope.tiles = tiles;
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }
})
.controller('ScenariosCtrl', function ($scope, $stateParams) {
})
.controller('InfoCtrl', function ($scope, $stateParams) {
})
.controller('PlaylistCtrl', function($scope, $stateParams) {
});
