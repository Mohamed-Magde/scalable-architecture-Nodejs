'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieParser = require('cookie-parser');

module.exports = () => {
  let server = express(), create, start;

  create = (config, db) => {
    let routes = require('./routes');

    // Server settings 
    server.set('env', config.env);
    server.set('port', config.port); server.set('hostname', config.hostname);

    // Returns middleware that parses json    
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: false })); server.use(cookieParser());
    server.use(logger('dev'));
    server.use(passport.initialize());
    mongoose.connect(db.database);
    require('../configs/passport')(passport);

    // Set up routes     
    routes.init(server);
  };

  start = () => {
    let hostname = server.get('hostname'), port = server.get('port');
    server.listen(port, () => {
      console.log('Express server listening on - http://' + hostname + ':' + port);
    });
  };
  return { create: create, start: start };
};


