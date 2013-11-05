
 
var gpio = require("gpio");
var gpio17, gpio22, intervalTimer;


exports.red = function(req, res){
	  // Flashing lights if LED connected to GPIO11
	gpio17 = gpio.export(17, {
	   ready: function() {
	      inervalTimer = setInterval(function() {
	         gpio17.set();
	         setTimeout(function() { gpio17.reset(); }, 500);
	      }, 1000);

	   }
	});

};

exports.green = function(req, res){

	  // Flashing lights if LED connected to GPIO11
	gpio22 = gpio.export(22, {
	   ready: function() {
	      inervalTimer = setInterval(function() {
	         gpio22.set();
	         setTimeout(function() { gpio22.reset(); }, 500);
	      }, 1000);
   
	   }
	});

};

exports.off = function(req, res){
  	clearInterval(intervalTimer);          // stops the voltage cycling
 //  gpio22.removeAllListeners('change');   // unbinds change event
  // gpio22.reset();                        // sets header to low
  // gpio22.unexport();                     // unexport the header
   //gpio17.removeAllListeners('change');   // unbinds change event
   gpio17.reset();                        // sets header to low
   gpio17.unexport();                     // unexport the header

};
