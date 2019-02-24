const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');

//db connect params
const user= 'db_user';
const key = '3141592';
const authMechanism = 'DEFAULT';

// onnection URL
const url = `mongodb+srv://${user}:${key}@cluster0-1612d.mongodb.net/test?retryWrites=true?authMechanism=${authMechanism}`;

//start db connect
mongoose.connect(url,{useNewUrlParser:true})
    .then(bd => console.log('[OK] DB is connected'))
    .catch(err => console.error(`[ERR] ${err}`)); 

//init express app
let app = express();

//set app params
app.set('port',3000);
app.use(express.json());
app.use(express.urlencoded({extended:false})); //encoding of url
app.use(morgan('dev')); //logging in dev mode
app.use('/api/records', require('./routes/router')); // start point of routing 

//start app server
app.listen(app.get('port'), ()=> {
    console.log(`[OK] server Node.js is running on localhost:${app.get('port')}`);
});

