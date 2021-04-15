/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
'use strict';

require('dotenv').config();

const express = require('express');

const server = express();
const superagent = require('superagent');

server.use(express.static('/public'));

server.set ('view engine','ejs');

// server.use(express.static(__dirname + '/public'));
server.use('/public', express.static('public'));

const PORT = process.env.PORT || 5000;
server.listen(PORT,() =>{
  console.log(`Iam in PORT: ${PORT}`);
});



//************* HANDLERS **************************//
server.get('/', mainRouteHandler);
server.get('/searches/new', newSearchesHandler);
server.post ('/searches', searchesHandler);

//************* FUNCTIONS **************************//

function mainRouteHandler(req,res){
  res.render('pages/index');
}

function newSearchesHandler(req,res){
  res.render('pages/searches/new');
}

function searchesHandler(req,res){
  console.log(req.body);

  let searchType = '';

  if(req.body.title){
    searchType = 'title';
  }
  else if(req.body.authorName){
    searchType = 'authorName';
  }
  let searchBooks = req.body.search;
  let Bookurl = `https://www.googleapis.com/books/v1/volumes?q=in${searchType}:${searchBooks}&maxResults=10`;
  superagent.get(Bookurl).then(BData =>{
    let Data = BData.body.items.Data.map((val) => {
      return new books(val);
    });
    res.render ( 'pages/searches/show', { search:Data});
  })
    .catch (error=>{
      res.send(error);
    });
  //************* CONSTRUCTORS **************************//

  function books(BData) {
    if(!BData.volumeInfo.imageLinks){
      this.images = 'https://i.imgur.com/J5LVHEL.jpg';
    }
    else {
      this.images= BData.volumeInfo.imageLinks.thumbnail;
    }
    this.title = BData.volumeInfo.title;

    this.description = BData.volumeInfo.description;

    this.authorName = BData.volumeInfo.authorName;
  }

  server.get( '*',( req,res ) =>{

    let errObj = {
      status: 500,
      responseText: 'Sorry, something went wrong'
    };
    res.status( 500 ).send( errObj );

  });


}
