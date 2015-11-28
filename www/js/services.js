angular.module('random.services', [])

.factory('configService', function () {
    var tilesNumber = 9;

    return {
        tiles: { value: tilesNumber }
    }
})

.factory('symbolService', function (configService) {
    var availableIconClasses =
        ["fa-bus", "fa-bed", "fa-car",
        "fa-bolt", "fa-cloud", "fa-compass",
        "fa-gift", "fa-key", "fa-leaf",
        "fa-anchor", "fa-balance-scale", "fa-beer",

        "fa-gift", "fa-key", "fa-leaf",
        "fa-anchor", "fa-balance-scale", "fa-beer",
        "fa-bus", "fa-bed", "fa-car",
        "fa-bolt", "fa-cloud", "fa-compass",
        "fa-gift", "fa-key", "fa-leaf",
        "fa-anchor", "fa-balance-scale", "fa-beer",

        "fa-gift", "fa-key", "fa-leaf",
        "fa-anchor", "fa-balance-scale", "fa-beer"];

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function getRandomArray(size) {
        var row = [];
        var userIndexes = [];
        var tilesNumber = configService.tiles.value;

        var j = 0;
        for (var i = 0; i < size; i++) {
            var rand = 0;
            do {
                rand = getRandomInt(0, availableIconClasses.length - 1);
            } while (userIndexes.indexOf(rand) != -1);

            row.push({ iconClass: availableIconClasses[rand] });
            userIndexes.push(rand);
        }

        return row;
    }

    return {
        availableIconClasses: availableIconClasses,
        getRandomInt: getRandomInt,
        getRandomArray: getRandomArray
    };
})