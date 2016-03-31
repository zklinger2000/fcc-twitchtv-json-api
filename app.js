// app.js
angular.module('twitchApp', [])
// Add lodash for use in controllers, unit tests
.constant('_', window._)
// Add lodash for use in views, ng-repeat="x in _.range(3)"
.run(function ($rootScope) {
  $rootScope._ = window._;
})
// API Service
.factory('twitchService', function($http) {
  // Make a Twitch API call
  var twitchService = {
    get: function(channel) {
      return $http.get('https://api.twitch.tv/kraken/streams/' + channel);
    }
  };
  return twitchService;
})
// Main Controller
.controller('MainController', function($scope, twitchService, $http) {
  var vm = this;
  
  vm.favs = ["freecodecamp", "brunofin", "comster404", "storbeck", "terakilobyte", "habathcx", "OgamingSC2", "ESL_SC2", "RobotCaleb","thomasballinger","noobs2ninjas","beohoff"];
  vm.streams = [];
  
  // Filter for ordering online streams first
  $scope.onlineOrder = function (item) {
    if (item.stream === null) {
      return 1;
    } else {
      return 0;
    }
  }  
  
  // Make an API call for each channel in favorites list
  _.each((vm.favs), function(fav) {
    getStreamByChannel(fav);
  });
  
  // Call Twitch API for a channel and add to streams array
  function getStreamByChannel(channel) {
    return twitchService.get(channel).then(function(response) {
      console.info(response.data);
      var data = response.data;
      data.name = channel;
      vm.streams.push(data);
    }, function(err) {
      console.log(err);
      vm.streams.errors = vm.streams.errors || [];
      vm.streams.errors.push({ name: channel, message: err.data.message});
    });
  }

});
