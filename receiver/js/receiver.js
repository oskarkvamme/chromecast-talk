(function(){
  var namespace = 'urn:x-cast:chromecastappz';
  var messageBus = null;

  var navigate = function(direction){
    if(direction === 'next'){
      Reveal.next();
    }else if(direction === 'prev'){
      Reveal.prev();
    }
  };

  var initCast = function(){
    window.castReceiverManager = cast.receiver.CastReceiverManager.getInstance();

    window.castReceiverManager.onSenderDisconnected = function(event) {
      if(window.castReceiverManager.getSenders().length == 0 &&
      event.reason == cast.receiver.system.DisconnectReason.REQUESTED_BY_SENDER) {
        window.close();
      }
    }

    messageBus = window.castReceiverManager.getCastMessageBus(
        namespace,
        cast.receiver.CastMessageBus.MessageType.JSON
    );

    messageBus.onMessage = function(event) {
      var sender = event.senderId;
      var message = event.data;

      if(message.type === 'navigation'){
        navigate(message.action);
      }
    };

    window.castReceiverManager.start();
  };
  
  var initPresentation = function(){
    // Full list of configuration options available here:
      // https://github.com/hakimel/reveal.js#configuration
      Reveal.initialize({
        controls: false,
        progress: true,
        history: true,
        center: true,

        theme: Reveal.getQueryHash().theme, // available themes are in /css/theme
        transition: Reveal.getQueryHash().transition || 'default', // default/cube/page/concave/zoom/linear/fade/none

        // Parallax scrolling
        // parallaxBackgroundImage: 'https://s3.amazonaws.com/hakim-static/reveal-js/reveal-parallax-1.jpg',
        // parallaxBackgroundSize: '2100px 900px',

        // Optional libraries used to extend on reveal.js
        dependencies: [
          { src: 'lib/js/classList.js', condition: function() { return !document.body.classList; } },
          { src: 'plugin/markdown/marked.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
          { src: 'plugin/markdown/markdown.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
          { src: 'plugin/highlight/highlight.js', async: true, callback: function() { hljs.initHighlightingOnLoad(); } },
          { src: 'plugin/zoom-js/zoom.js', async: true, condition: function() { return !!document.body.classList; } },
          { src: 'plugin/notes/notes.js', async: true, condition: function() { return !!document.body.classList; } }
        ]
      });
  };
  
  initCast();
  initPresentation();
})();