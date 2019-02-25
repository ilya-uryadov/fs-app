const config = require('dotenv').config();
//console.log(config.parsed); // persing env params

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');

//db connect params
const user= process.env.DB_USER; 
const key = process.env.DB_KEY; 
const authMechanism = process.env.DB_AUTH;
const db_path = process.env.DB_PATH; 

// onnection URL
const url = `mongodb+srv://${user}:${key}@${db_path}?retryWrites=true?authMechanism=${authMechanism}`;

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
app.use('/', express.static(path.join(__dirname, '../dist')));

//start app server
app.listen(app.get('port'), ()=> {
    console.log(`[OK] server Node.js is running on localhost:${app.get('port')}`);
});

