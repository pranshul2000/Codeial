const mongoose = require('mongoose');
const env = require('./enviroment');
mongoose.connect(`mongodb://localhost/${env.db}`);

const db = mongoose.connection;

db.on('error', console.error.bind(console, "error connecting to database "));

db.once('open', function(){
    console.log('Connected to database MongoDB');
});

module.exports = db;