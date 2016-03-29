var streams = ["freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff"];

$(document).ready(function() {

  _.each(streams, function(value) {
    getFCCStream(value, updateView);
  });
  
  function updateView(data) {
    console.log(data);
    if (data.stream) {
      $('.channel-title').text(data.stream.channel.display_name);
    }
  }
  function getFCCStream(user, callback) {
    $.getJSON('https://api.twitch.tv/kraken/streams/' + user, callback);
  }

});
