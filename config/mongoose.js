const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/codeial_devlopment');

const db = mongoose.connection;

db.on('error', console.error.bind(console, "error connecting to database "));

db.once('open', function(){
    console.log('Connected to database MongoDB');
});

module.exports = db;