/**
 * jQuery Voice plugin 0.2
 * Copyright Subin Siby - http://subinsb.com
 * 
 * ------------
 * MIT licensed
 * ------------
 * A jQuery plugin to record, play & download microphone input sound from the user.
 * NEEDS recorder.js and recorderWorker.js to work - https://github.com/mattdiamond/Recorderjs
 *
 * Documentation - http://subinsb.com/html5-record-mic-voice
*/

(function($){
	$.extend({
		voice: {
			workerPath: "cdn/recorderWorker.js",
			initCalled: false,
			stream: false,
			init: function(){
				try {
					// Fix up for prefixing
					window.AudioContext = window.AudioContext||window.webkitAudioContext;
					navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
					window.URL = window.URL || window.webkitURL;
					if(navigator.getUserMedia === false){
						alert('getUserMedia() is not supported in your browser');
					}
					$.voice.context = new AudioContext();
				}
				catch(e) {
					alert('Web Audio API is not supported in this browser');
				}
			},
      
			record: function(output, callback){
				if($.voice.initCalled === false){
					this.init();
					$.voice.initCalled = true;
				}
				navigator.getUserMedia({audio: true}, function(stream){
					var input = $.voice.context.createMediaStreamSource(stream);
					if(output === true){
						input.connect($.voice.context.destination);
					}
					$.voice.recorder = new Recorder(input, {
						workerPath : $.voice.workerPath
					});
					$.voice.stream = stream;
					$.voice.recorder.record();
					callback(stream);
				}, function() {
					alert('No live audio input');
				});
			},
      
			stop: function(){
				$.voice.recorder.stop();
				$.voice.recorder.clear();
				$.voice.stream.stop();
				return $.voice;
			},
      
			export: function(callback, type){
				$.voice.recorder.exportWAV(function(blob) {
					if(type == "" || type == "blob"){
						callback(blob);
					}else if (type == "base64"){
            var reader = new window.FileReader();
            reader.readAsDataURL(blob); 
            reader.onloadend = function() {
              base64data = reader.result;                
              callback(base64data);
            }
          }else if(type == "URL"){
						var url = URL.createObjectURL(blob);
						callback(url);
					}
				});
			}
		}
	});
})(jQuery);
