const mongoose = require('mongoose');
const config = require('../config/config');

before(function(done){
    this.timeout(100000)
    mongoose.connect(config.parametros.testdb);
    mongoose.connection.once('open', () => {
        console.log('Databse Online');
        done();
    })
    .on('error', (err) => {
        console.warn('Warning', err);
    })
});