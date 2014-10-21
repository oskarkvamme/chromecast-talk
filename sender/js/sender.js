(function(){
  var applicationID = '0052F2CA';
  var session = null;
  var namespace = 'urn:x-cast:chromecastappz';

  var receiverListener = function(e) {
    if( e === chrome.cast.ReceiverAvailability.AVAILABLE) {

    }
  };

  var sessionListener = function(e) {
    session = e;
  };

  var onInitSuccess = function() {
    var connectButton = $('#connect-button');

    connectButton.removeClass()
  };

  var onError = function(e){
    console.log('Error' + e);
  };

	var initApi = function(){
    var sessionRequest = new chrome.cast.SessionRequest(applicationID);
    
    var apiConfig = new chrome.cast.ApiConfig(sessionRequest,
      sessionListener,
      receiverListener);

    chrome.cast.initialize(apiConfig, onInitSuccess, onError);
	};

  var onRequestSessionSuccess = function(e){
    session = e;

    $('#next, #prev').removeClass('disabled');
  };

  var onLaunchError = function(){
    console.log('launch error');
  };

  var init = function(){
    var connectButton = $('#connect-button');

    connectButton.on('click', function(e){
      e.preventDefault();
      chrome.cast.requestSession(onRequestSessionSuccess, onLaunchError);
    });

    $('#next').on('click', function(e){
      e.preventDefault();
      if(session === null) return;

      var message = {
        type: 'navigation',
        action: 'next'
      };

      session.sendMessage(namespace, message, function(){}, function(){});
    });

    $('#prev').on('click', function(e){
      e.preventDefault();
      if(session === null) return;

      var message = {
        type: 'navigation',
        action: 'prev'
      };

      session.sendMessage(namespace, message, function(){}, function(){});
    });
  };


	window['__onGCastApiAvailable'] = function(loaded, errorInfo) {
	  if (loaded) {
	    initApi();
	  } else {
	    console.log(errorInfo);
	  }
	}

  init();
})();