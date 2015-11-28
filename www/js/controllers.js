angular.module('starter.controllers',
    ['random.services'])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

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
    }).then(function (modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
        $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
        console.log('Doing login', $scope.loginData);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function () {
            $scope.closeLogin();
        }, 1000);
    };
})

.controller('OptionsCtrl', function ($scope, configService,
    $ionicSideMenuDelegate) {

    $scope.tilesOptions =
        [
            { name: 'Proste', number: 3 },
            { name: 'Łatwe', number: 6 },
            { name: 'Normalne', number: 9 },
            { name: 'Trudne', number: 12 }
        ];
    

    $scope.tilesNumber = configService.tiles;

    $scope.$on('$ionicView.enter', function () {
        $ionicSideMenuDelegate.canDragContent(false);
    });
    $scope.$on('$ionicView.leave', function () {
        $ionicSideMenuDelegate.canDragContent(true);
    });
    
})

.controller('RandomCtrl', function ($scope, $stateParams, configService,
    symbolService) {
    $scope.randomTiles = randomTiles;
    
    $scope.tiles = [];

    function randomTiles() {
        var tiles = [];
        var userIndexes = [];
        var tilesNumber = configService.tiles.value;
        $scope.tilesNumber = tilesNumber;
        var j = 0;
        for (var i = 0; i < tilesNumber / 3; i++) {
            var row = [];
            for (var k = 0; k < 3 && j < tilesNumber; k++, j++) {
                var rand = 0;
                do {
                    rand = symbolService.getRandomInt(0, symbolService.availableIconClasses.length - 1);
                } while (userIndexes.indexOf(rand) != -1);

                row.push({ iconClass: symbolService.availableIconClasses[rand] });
                userIndexes.push(rand);
            }
            tiles.push(row);
        }
        $scope.tiles = tiles;
    }
})
.controller('ScenariosCtrl', function ($scope, $stateParams) {
})
.controller('InfoCtrl', function ($scope, $stateParams) {
})
.controller('PlaylistCtrl', function ($scope, $stateParams) {
})
.controller('MonomitCtrl', function ($scope, $stateParams, $ionicPopup,
    symbolService) {
    $scope.showHint = showHint;
   
    var data = [
        {
            name: 'Status quo',
            hint: 'Status quo - podpowiedź',
            iconClass: 'fa-gift',
            done: false
        },
        {
            name: 'Wezwanie',
            hint: 'Wezwanie - podpowiedź',
            iconClass: 'fa-key',
            done: false
        },
    ];
    $scope.stages = data;

    function generate() {
        var randomIcons = symbolService.getRandomArray(data.length)
        data = $scope.stages;
        for(var i=0;i<data.length;i++)
        {
            data[i].iconClass = randomIcons[i].iconClass;
        }

        $scope.stages = data;
    }

    $scope.generate = generate;

    function showHint(hint)
    {
        var alertPopup = $ionicPopup.alert({
            title: 'Don\'t eat that!',
            template: hint
        });
        alertPopup.then(function (res) {
            console.log('Thank you for not eating my delicious ice cream cone');
        });
    }
});
