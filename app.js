// Jonathan Leung

// Constants
var PORT = 80;
var TESTMODE = false;

if(process.argv.length > 2)
{
    if(process.argv[2] === "test")
    {
        PORT = 8000;
        TESTMODE = true;
    }
}

// Modules
var express = require('express');
var app = express();

// Website Router
app.use('/', express.static(__dirname + '/website/'));

// Start Listening
var process_user = 'node';
var process_group = 'node';

var server = app.listen(PORT, function(){
    console.log('Listening on port %s', server.address().port);

    //Drop root privileges
    if(!TESTMODE)
    {
        console.log("Dropping root privileges");
        process.setgid(process_group);
        process.setuid(process_user);
        console.log("New user: " + process_user);
        console.log("New uid:  " + process.getuid());
    }
});