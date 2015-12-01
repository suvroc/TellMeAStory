angular.module('random.services', [])

.factory('configService',/* @ngInject */ function (localStorageService) {
    var tilesNumber = {
        value: 9
    };
    var LS_CONFIG_TILES_NUMBER = "tiles_number";

    if (!localStorageService.get(LS_CONFIG_TILES_NUMBER))
    {
        localStorageService.set(LS_CONFIG_TILES_NUMBER, tilesNumber.value);
    } else {
        tilesNumber.value = localStorageService.get(LS_CONFIG_TILES_NUMBER);
    }

    function saveConfig()
    {
        localStorageService.set(LS_CONFIG_TILES_NUMBER, tilesNumber.value);
    }

    return {
        tiles: tilesNumber,
        saveConfig: saveConfig
    }
})

.factory('symbolService',/* @ngInject */ function (configService, localStorageService) {
    var LS_SAVED_SETS = "saved_sets";

    var availableIconClasses =
        ["icon-anchor", "icon-anvil", "icon-archery-target",
            "icon-axe", "icon-bear-trap", "icon-book",
            "icon-boomerang", "icon-broadsword", "icon-campfire",
            "icon-cat", "icon-cheese", "icon-coffee-mug",
            "icon-crossbow", "icon-fish", "icon-flask",
            "icon-gecko", "icon-hammer", "icon-hand",
            "icon-hearts", "icon-horns", "icon-horseshoe",
            "icon-hydra", "icon-jigsaw-piece",
            "icon-lantern-flame", "icon-leaf2",
            "icon-microphone", "icon-muscle-up",
            "icon-nuclear", "icon-octopus", "icon-palm-tree",
            "icon-pawprint", "icon-pine-tree", "icon-ping-pong",
            "icon-rabbit", "icon-radar-dish", "icon-radioactive",
            "icon-raven", "icon-revolver", "icon-round-bottom-flask",
            "icon-scythe", "icon-sickle", "icon-snail",
            "icon-soccer-ball", "icon-super-mushroom",
            "icon-surveillance-camera", "icon-tower",
            "icon-wolf-head", "icon-cloudy", "icon-lightning",
            "icon-snowy", "icon-weather", "icon-lightning2",
            "icon-sun", "icon-moon", "icon-cart", "icon-music",
            "icon-earth", "icon-droplet", "icon-gift",
            "icon-megaphone", "icon-microscope", "icon-paintcan",
            "icon-puzzle", "icon-rocket2", "icon-squirrel",
            "icon-telescope", "icon-home", "icon-office",
            "icon-pencil", "icon-eyedropper", "icon-droplet2",
            "icon-paint-format", "icon-image", "icon-camera",
            "icon-headphones", "icon-bullhorn", "icon-mic",
            "icon-book2", "icon-compass2", "icon-map2", "icon-clock",
            "icon-key2", "icon-cog", "icon-aid-kit", "icon-trophy",
            "icon-gift2", "icon-glass", "icon-mug", "icon-spoon-knife",
            "icon-rocket3", "icon-hammer2", "icon-fire2", "icon-lab",
            "icon-magnet", "icon-airplane", "icon-truck2",
            "icon-accessibility", "icon-earth2", "icon-man-woman",
            "icon-happy", "icon-sad", "icon-scissors",
            "icon-anchor-outline", "icon-lightbulb", "icon-tree",
            "icon-leaf3", "icon-airplanemode_active", "icon-local_drink",
            "icon-rowing", "icon-beach_access", "icon-child_friendly",
            "icon-fitness_center", "icon-goat", "icon-camera2",
            "icon-film", "icon-drink", "icon-coffee", "icon-mug2",
            "icon-icecream", "icon-cake", "icon-alarmclock",
            "icon-graduate", "icon-bowling", "icon-satellite",
            "icon-medal", "icon-bomb", "icon-diamond2", "icon-justice",
            "icon-dollar", "icon-safe", "icon-music2", "icon-heart",
            "icon-car", "icon-bike", "icon-plane2", "icon-rocket4",
            "icon-book3", "icon-navigation", "icon-search",
            "icon-diamond", "icon-clock2", "icon-paperplane",
            "icon-banknote", "icon-music3", "icon-megaphone2",
            "icon-study", "icon-lab2", "icon-t-shirt", "icon-fire3",
            "icon-wallet", "icon-truck3", "icon-leaf", "icon-fire",
            "icon-plane", "icon-key", "icon-truck", "icon-umbrella",
            "icon-suitcase", "icon-flag-o", "icon-fire-extinguisher",
            "icon-rocket", "icon-unlock-alt", "icon-female", "icon-male",
            "icon-ship", "icon-user-secret", "icon-motorcycle"];

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

        return {
            stages: row,
            name: guid()
        };
    }

    function saveTiles(tiles, type)
    {
        

        var dataList = [];
        if (localStorageService.get(LS_SAVED_SETS))
        {
            dataList = localStorageService.get(LS_SAVED_SETS);
        }
        var list =
            dataList.filter(function (el) { return el.name == tiles.name });
        var element = list.length > 0 ? list[0] : null;
        if (element)
        {
            element.stages = tiles.stages;
            element.type = type;
            element.date = new Date();
        } else {
            tiles.type = type;
            tiles.date = new Date();
            dataList.push(tiles);
        }

        localStorageService.set(LS_SAVED_SETS, dataList);
    }

    function getSavedTiles(type)
    {
        return localStorageService.get(LS_SAVED_SETS)
            .filter(function(el) {return el.type == type});
    }

    function getSavedTile(name) {
        return localStorageService.get(LS_SAVED_SETS)
            .filter(function (el) { return el.name == name });
    }

    function guid() {
        function _p8(s) {
            var p = (Math.random().toString(16) + "000000000").substr(2, 8);
            return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
        }
        return _p8() + _p8(true) + _p8(true) + _p8();
    }

    return {
        getRandomArray: getRandomArray,
        saveTiles: saveTiles,
        getSavedTiles: getSavedTiles,
        getSavedTile: getSavedTile
    };
})