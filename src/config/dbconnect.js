require('dotenv').config();
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGOURL,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useFindAndModify:false,
    useUnifiedTopology:true,
    socketTimeoutMS: 45000,
    poolSize: 10
})

mongoose.connection.on('error', err => {
  console.log(err);
});

module.exports = mongoose.connection ;