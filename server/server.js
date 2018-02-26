var express = require('express'),
    path = require('path'),
    http = require('http');

var app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const passport = require('./strategies/sql.localstrategy');
const sessionConfig = require('./modules/session-middleware');

// Route includes
const userRouter = require('./routes/user.router');
const themdbRouter = require('./routes/themdb.router');
const watchlistRouter = require('./routes/watchlist.router');
const omdbRouter = require('./routes/omdb.router');
const guideboxRouter = require('./routes/guidebox.router');
const utellyRouter = require('./routes/utelly.router');

// App Set //
const port = process.env.PORT || 3000;


// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Passport Session Configuration
app.use(sessionConfig);

// Start up passport sessions
app.use(passport.initialize());
app.use(passport.session());



/* Routes */


// Serve static files
app.use(express.static('server/public'));

// Http Methods
app.use('/api/user', userRouter);
app.use('/api/themdb', themdbRouter);
app.use('/watchlist', watchlistRouter);
app.use('/omdb', omdbRouter);
app.use('/guidebox', guideboxRouter);
app.use('/utelly', utellyRouter);

app.listen(port, () => {
  console.log('Listening on port:', port);
});
