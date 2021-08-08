const { urlencoded } = require('express')
const express = require('express');
const mongoose = require('mongoose');
require("dotenv/config");
const cors = require('cors')

const PORT = process.env.PORT || 5000;

const app = express()

app.use( cors() )
app.use(express.json())
app.use( urlencoded( {extended : true}));



mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
      if (err) throw err;
      console.log('Db connected!')
    }
  );

app.listen(PORT, () => {
    console.log('Server started! ')
})