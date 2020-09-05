const express = require('express');
const env = require('./config/enviroment');
const logger = require('morgan');

const cookieParser = require('cookie-parser');
const app = express();
require('./config/view-helpers')(app);
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const passportFacebook = require('./config/passport-facebook-oauth-strategy');
const MongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');
// set up the chat server to be used with socket.io
const chatServer = require('http').Server(app);
const chatScokets = require('./config/chat_sockets').chatScokets(chatServer);
chatServer.listen(5000);
console.log('chat server is listening on port: 5000');
const path = require('path');

if (env.name == 'devlopment') {
    app.use(sassMiddleware({
        src: path.join(__dirname, env.asset_path, 'scss'),
        dest: path.join(__dirname, env.asset_path, 'css'),
        debug: true,
        outputStyle: 'expanded',
        prefix: '/css'

    }));
}



app.use(express.urlencoded({extended: false}));
app.use(cookieParser());


app.use(express.static(env.asset_path));

// make the uploads path avaliable to the browser 
app.use('/uploads', express.static(__dirname + '/uploads'));

app.use(logger(env.morgan.mode, env.morgan.options));

app.use(expressLayouts);
// extract style and scripts from subpages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');


// mongo store is used to store the session cookie in the DB
app.use(session({
    name: 'Codeial',
    // TODO change the secret before deployement
    secret: env.session_cookie_key,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        },
        function (err) {
            console.log(err || 'connect mongo setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());
// use express router

app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMware.setFlash);
app.use('/', require('./routes'));

app.listen(port, function (err) {
    if (err) {
        console.log(`error in setting up the server ${err}`);
        return;
    }
    console.log(`server is running on port: ${port}`);
});
