require('dotenv').config();
const mongoose = require('mongoose')  // object modeling library for MongoDB

mongoose.connect(process.env.MONGOURL, {
  useNewUrlParser: true,    // ∵ older URL string parser is deprecated
  useUnifiedTopology: true, // ∵ older Server Discovery and Monitoring engine is deprecated
  useCreateIndex: true,     // ∵ older ensureIndex is deprecated
  useFindAndModify: false,  // ∵ older findAndModify is deprecated. Use findOneAndUpdate, findOneAndReplace or findOneAndDelete instead
  socketTimeoutMS: 45000,   // How long the MongoDB driver will wait before killing a socket due to inactivity after initial connection; By default: 30000
  poolSize: 10              // The max no. of sockets the MongoDB driver will keep open for this connection. By default, poolSize: 5.
})

mongoose.connection.on('error', err => console.log(err));

module.exports = mongoose.connection;