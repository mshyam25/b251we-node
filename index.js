// const express=require('express');
// const { MongoClient } = require('mongodb');
//type : commonjs

import express from 'express';
import {MongoClient} from 'mongodb'; //type : module
import dotenv from 'dotenv';

dotenv.config(); // getting all env keys

const app=express(); // alternative to express - hapi

//middleware
//app.use -> intercets every request
app.use(express.json())  //Intercepts all requests and parses the data into json
//express.json() -> inbuild middleware

  //setting connection with mongodb

//const MONGO_URL="mongodb://localhost"; //"mongodb://localhost:27017"

const MONGO_URL=process.env.MONGO_URL; 



async function createConnection(){

    const client=new MongoClient(MONGO_URL);
    await client.connect(); // returns a promise
    console.log('Mongo DB Connected')
return client
 
}

const client= await createConnection() //allows await outside function i.e at top level


//welcome msg

app.get('/',(request,response)=>{

    response.send('Hello, Liverpool!!!!')
})

//get movies by query params and all movies
  
  app.get('/movies', async (request,response)=>{


    //db.movies.find({language:'english',rating:8})

const filter=request.query
if(filter.rating)
{
    filter.rating=+filter.rating
}
    const movies = await client.db('b251we')
    .collection('movies')
    .find(filter) // returns cursor -> pagination
    .toArray()

response.send(movies)
console.log(request.query)
  })


  //movie search by id

  app.get('/movies/:id',async (request,response)=>{

    const {id}=request.params;
    console.log(id)

    const movie= await client.db('b251we')
    .collection('movies')
    .findOne({id: +id})

  movie ?  response.send(movie) : response.status(404).send('No Matching movie')
   
  })


  //create movies

  app.post('/movies', async (request,response)=>{


    const data=request.body;
    console.log(data)

    //db.movies.insertMany([])

   const result = await client.db('b251we')
    .collection('movies')
    .insertMany(data);

response.send(result)
  })

//delete by id

app.delete('/movies/:id',async (request,response)=>{

//db.collections.deleteOne({id:101})

const {id}=request.params

const result=await client.db('b251we')
.collection('movies')
.deleteOne({id: +id})
console.log(result)
response.send(result)
})

//update rating by id

app.put('/movies/:id',async(request,response)=>{

    //db.collections.updateOne({id:101},{$set: {rating: 8}})
const data=request.body
    const {id}=request.params
console.log(id)
    const result=await client.db('b251we')
    .collection('movies')
    .updateOne({id: +id},{$set: data})

    response.send(result)
})

  //setting up port 

//const port=9000;

const PORT=process.env.PORT
app.listen(PORT,()=>{
 
    console.log('The Server is started on ',PORT)
})