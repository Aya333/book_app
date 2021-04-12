/* eslint-disable no-undef */
'use strict';

require('dotenv').config();

const express = require('express');

const server = express();

server.use(express.static('/public'));

const PORT = process.env.PORT || 5000;

server.listen(PORT,() =>{
  console.log(`Iam in PORT: ${PORT}`);
});


