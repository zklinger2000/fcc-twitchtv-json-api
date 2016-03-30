// app.js
angular.module('twitchApp', [])

// allow DI for use in controllers, unit tests
.constant('_', window._)
// use in views, ng-repeat="x in _.range(3)"
.run(function ($rootScope) {
  $rootScope._ = window._;
})
// 
.factory('twitchService', function($http) {

  
  var twitchService = {
    get: function(channel) {
      return $http.get('https://api.twitch.tv/kraken/streams/' + channel);
    }
  };

  return twitchService;
})
.controller('MainController', function($scope, twitchService, $http) {
  var vm = this;
  
  vm.favs = ["freecodecamp", "storbeck", "terakilobyte", "habathcx", "OgamingSC2", "ESL_SC2", "RobotCaleb","thomasballinger","noobs2ninjas","beohoff"];
  vm.streams = [];
  
  
  _.each((vm.favs), function(fav) {
    getStreamByChannel(fav);
  });
    
  function getStreamByChannel(channel) {
    return twitchService.get(channel).then(function(response) {
      console.info(response.data);
      var data = response.data;
      data.name = channel;
      vm.streams.push(data);
    });
  }

});
