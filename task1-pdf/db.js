const mysql = require('mysql');
const config = require('./config');
const connection = mysql.createConnection(config.database);

connection.connect(() => {
  console.log('connection established');
});

module.exports = connection;