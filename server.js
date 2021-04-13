/* eslint-disable no-undef */
'use strict';

require('dotenv').config();

const express = require('express');

const server = express();

server.use(express.static('/public'));

server.set ('view engine','ejs');

// server.use(express.static(__dirname + '/public'));
server.use('/public', express.static('public'));

const PORT = process.env.PORT || 5000;

server.listen(PORT,() =>{
  console.log(`Iam in PORT: ${PORT}`);
});

server.get('/',(req,res)=>{
  res.render('pages/index');
});
