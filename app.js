
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var colors = require('./routes/colors');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/red', colors.red);
app.get('/green', colors.green);
app.get('/off', colors.off);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

/*
 * some example code for testing your led stripe
 */

var myLedStripe = require('./index');
var myArgs = [ 32, 'WS2801' , '/dev/spidev0.1' ];
myLedStripe.connect(20, 'WS2801' , '/dev/spidev0.1');
console.log(myArgs.length);
console.log(String(numLEDs));
console.log(numLEDs);
// sanity check for arguments
var numLEDs = ~~Number(myArgs[0]);
if ((myArgs.length == 3)){
    
		console.log('made it');
    // everything possibly sane
    myStripeType = myArgs[1];
    mySpiDevice = myArgs[2]
    console.log('Testing ' + myStripeType + ' LED stripe with ' + numLEDs + ' LEDs on SPI ' + mySpiDevice);

    // connecting to SPI
    myLedStripe.connect(numLEDs, myStripeType, mySpiDevice);

    // disconnect on Ctrl-C (not necessary but we will play nice)
    process.on( 'SIGINT', function() {
      console.log( "\ngracefully shutting down from  SIGINT (Ctrl-C)" )
      // close conection to SPI
      myLedStripe.disconnect();
      process.exit( )
    })

    
    // do some fancy stuff
    myLedStripe.fill(0xFF, 0x00, 0x00);
    console.log("red");
    setTimeout(function(){
        myLedStripe.fill(0x00, 0xFF, 0x00);
        console.log("green")}, 1000);
    setTimeout(function(){
        myLedStripe.fill(0x00, 0x00, 0xFF);
        console.log("blue")}, 2000);
    setTimeout(function(){
        myLedStripe.fill(0xFF, 0xFF, 0xFF);
        console.log("white")}, 3000);
    setTimeout(doFancyColors, 4000);

 

    function doFancyColors(){
        // o.k., lets do some colorful animation
        console.log("all colors are beautiful \\o/")
        var myDisplayBuffer = new Buffer(numLEDs*3);
        var animationTick = 0.005;
        var angle = 0;
        var ledDistance = 0.3;
        setInterval(function(){
          angle = (angle < Math.PI * 2) ? angle : angle - Math.PI*2;
          for (var i=0; i<myDisplayBuffer.length; i+=3){
            //red
            myDisplayBuffer[i] = 128 + Math.sin(angle + (i/3)*ledDistance) * 128;
            //green
            myDisplayBuffer[i+1] = 128 + Math.sin(angle * -5 + (i/3)*ledDistance) * 128;
            //blue
            myDisplayBuffer[i+2] = 128 + Math.sin(angle * 7 + (i/3)*ledDistance) * 128;
          }
          myLedStripe.sendRgbBuf(myDisplayBuffer);
          angle+=animationTick;
        },5);
    }; // end doFancyColors

} else {
  console.log( "\nUsage:\tnode example1 <number of LEDs> <stripe type> <SPI device>\n\n"
              +"where \t<number of LEDs> is an integer > 0 and\n"
              +"\t<stripe type> is either WS2801 or LPD8806\n"
              +"\t<SPI device> is your SPI device\n\n"
              +"e.g. \t node example1 32 WS2801 /dev/spidev0.0\n\n"
              )
}