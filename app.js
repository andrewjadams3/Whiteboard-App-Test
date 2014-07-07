var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

// socket.io
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3000, function(){
  console.log('listening on *:3000');
});

// A user connects to the server (opens a socket)
io.on('connection', function (socket) {

    // (2): The server recieves a ping event
    // from the browser on this socket
    socket.on('ping', function ( data ) {

        console.log('socket: server recieves ping (2)');

        // (3): Return a pong event to the browser
        // echoing back the data from the ping event 
        io.emit( 'pong', data );   

        console.log('socket: server sends pong to all(3)');
    });

    socket.on( 'startPath', function(x, y) {
        socket.broadcast.emit( 'startPath', x, y);
    })

    socket.on( 'drawPath', function(x, y) {
        socket.broadcast.emit( 'drawPath', x, y);
    })
});


module.exports = app;
