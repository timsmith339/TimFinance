var express = require('express');
var app = express();
app.disable('view cache');
var settings = require('./config/settings');

// Register API Routes
require('./api/routes/index.js')(app);

// Start Page
app.use('/', express.static(__dirname));

app.listen(settings.port, function () {
    console.log('Listening on port ' + settings.port);
});