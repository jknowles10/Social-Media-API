const { connect, connection } = require('mongoose');

const connectionURL = 'mongodb://localhost/social-media-api';

connect(connectionURL);

module.exports = connection;