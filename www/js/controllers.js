﻿angular.module('starter.controllers',
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

    $scope.valueChanged = function () {
        configService.saveConfig();
    }

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
    $scope.saveTiles = saveTiles;
    
    $scope.tiles = [];

    function randomTiles() {
        var tiles = [];
        var randomIcons = symbolService.getRandomArray(configService.tiles.value);
        
        var i, j, temparray, chunk = 3;
        for (i = 0, j = randomIcons.stages.length; i < j; i += chunk) {
            temparray = randomIcons.stages.slice(i, i + chunk);
            tiles.push(temparray);
        }

        $scope.tiles = {
            stages: tiles,
            name: randomIcons.name
        };
    }

    function saveTiles(tiles)
    {
        symbolService.saveTiles(tiles, 'random');
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
   
    var data =
        {
            name: '',
            stages:
        [
            {
                name: 'Status quo',
                hint: 'Opis sytuacji ogólnej bohatera',
                iconClass: 'fa-gift',
                done: false
            },
            {
                name: 'Wezwanie',
                hint: 'Wezwanie do przygody, do wyjścia z codzienności',
                iconClass: 'fa-key',
                done: false
            },
            {
                name: 'Wsparcie',
                hint: 'Pomoc w wyruszeniu w drogę lub rozpoczeciu przygody',
                iconClass: 'fa-key',
                done: false
            },
            {
                name: 'Start',
                hint: 'Początek przygody',
                iconClass: 'fa-key',
                done: false
            },
            {
                name: 'Próby',
                hint: 'Wyzwania na drodze do celu',
                iconClass: 'fa-key',
                done: false
            },
            {
                name: 'Kryzys',
                hint: 'Załamanie bohatera w drodze do celu',
                iconClass: 'fa-key',
                done: false
            },
            {
                name: 'Skarb',
                hint: 'Poznanie nagrody czekającej u celu',
                iconClass: 'fa-key',
                done: false
            },
            {
                name: 'Rezultat',
                hint: 'Wynik zmagań bohatera',
                iconClass: 'fa-key',
                done: false
            },
            {
                name: 'Powrót',
                hint: 'Powrót do codziennego życia',
                iconClass: 'fa-key',
                done: false
            },
            {
                name: 'Nowe życie',
                hint: 'Zmiany w życiu po przezyciu przygody',
                iconClass: 'fa-key',
                done: false
            },
            {
                name: 'Rozwiązanie',
                hint: 'Znalezienie rozwiazania na poczatkowe problemy',
                iconClass: 'fa-key',
                done: false
            },
        ]
        };
    $scope.stagesObject = data;

    generate();

    function generate() {
        var randomIcons = symbolService.getRandomArray(data.stages.length)
        data = $scope.stagesObject;
        for(var i=0;i<data.stages.length;i++)
        {
            data.stages[i].iconClass = randomIcons.stages[i].iconClass;
        }
        data.name = randomIcons.name;
        $scope.stagesObject = data;
    }

    $scope.generate = generate;
    $scope.saveTiles = saveTiles;

    function showHint(hint)
    {
        var alertPopup = $ionicPopup.alert({
            title: 'Podpowiedź!',
            template: hint
        });
        alertPopup.then(function (res) {
            console.log('Thank you for not eating my delicious ice cream cone');
        });
    }

    function saveTiles(tiles) {
        symbolService.saveTiles(tiles, 'monomit');
    }
})
.controller('LoadCtrl', function ($scope, $stateParams) {
})
.controller('LoadScenarioCtrl', function ($scope, $stateParams, symbolService) {
    $scope.scenarios = symbolService.getSavedTiles($stateParams.scenarioName);
    $scope.scenarioName = $stateParams.scenarioName;
});
