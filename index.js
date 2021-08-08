const { urlencoded } = require('express')
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path')
//DB_CONNECT = mongodb+srv://admin:admin@cluster0.pxufo.mongodb.net/groceryBud?retryWrites=true&w=majority

const PORT = process.env.PORT || 5000;

const app = express()

app.use( cors() )
app.use(express.json())
app.use( urlencoded( {extended : true}));



mongoose.connect(
 "mongodb+srv://admin:admin@cluster0.pxufo.mongodb.net/groceryBud?retryWrites=true&w=majority" ,
    { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
      if (err) throw err;
      console.log('Db connected!')
    }
  );

  app.use('/items', require('./routes/users'))

 

  if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname,'Frontend/build')))
    app.get('*', (req,res) => {
      res.sendFile(path.join(__dirname,'Frontend/build/index.html'))
    })
  }


app.listen(PORT, () => {
    console.log('Server started! Port : ' + PORT)
})