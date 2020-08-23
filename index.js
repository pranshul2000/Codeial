const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose'); 
// used for session cookie
const session = require('express-session');
const passpost = require('passport');
const passportLocal = require('./config/passport-local-strategy');

app.use(express.urlencoded());
app.use(cookieParser());


app.use(express.static('./assets'));

app.use(expressLayouts);
// extract style and scripts from subpages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    name: 'Codeial',
    // TODO change the secret before deployement
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000* 60* 100)
    }
}));

app.use(passpost.initialize());
app.use(passpost.session());
// use express router
app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log(`error in setting up the server ${err}`);
        return;
    }
    console.log(`server is running on port: ${port}`);
});
