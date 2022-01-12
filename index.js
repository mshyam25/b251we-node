// const express=require('express');
// const { MongoClient } = require('mongodb');
//type : commonjs

import express from 'express';
import {MongoClient} from 'mongodb'; //type : module
import dotenv from 'dotenv';

import {moviesRouter} from './routes/movies.js'



dotenv.config(); // getting all env keys

export const app=express(); // alternative to express - hapi

  //setting connection with mongodb

//const MONGO_URL="mongodb://localhost"; //"mongodb://localhost:27017"

const MONGO_URL=process.env.MONGO_URL; 



async function createConnection(){

    const client=new MongoClient(MONGO_URL);
    await client.connect(); // returns a promise
    console.log('Mongo DB Connected')
return client
 
}

export const client= await createConnection() //allows await outside function i.e at top level


//welcome msg

app.get('/',(request,response)=>{

    response.send('Hello, Villans')
})

//middleware


//app.use -> intercets every request
app.use(express.json()) //Intercepts all requests and parses the data into json
app.use("/movies",moviesRouter) 
//express.json() -> inbuild middleware

//setting up port 

//const port=9000;

const PORT=process.env.PORT
app.listen(PORT,()=>{
 
    console.log('The Server is started on ',PORT)
})


