// const express=require('express');
// const { MongoClient } = require('mongodb');
//type : commonjs

import express from 'express';
import {MongoClient} from 'mongodb'; //type : module
import dotenv from 'dotenv';
import chalk from 'chalk';

import {moviesRouter} from './routes/movies.js'
import bcrypt from 'bcrypt'
import passwordValidator from 'password-validator';
import {usersRouter} from './users.js'

import cors from 'cors';

dotenv.config(); // getting all env keys

export const app=express(); // alternative to express - hapi

//middleware

//app.use -> intercets every request
app.use(express.json()) //Intercepts all requests and parses the data into json
app.use(cors()) 
app.use("/movies",moviesRouter) 

app.use('/users',usersRouter)


//express.json() -> inbuild middleware
  //setting connection with mongodb

//const MONGO_URL="mongodb://localhost"; //"mongodb://localhost:27017"

const MONGO_URL=process.env.MONGO_URL; 



async function createConnection(){

    const client=new MongoClient(MONGO_URL);
    await client.connect(); // returns a promise
    console.log(chalk.bold.blue.inverse('Mongo DB Connected'))
return client
 
}

export const client= await createConnection() //allows await outside function i.e at top level


//welcome msg

app.get('/',(request,response)=>{

    response.send('Hello, Villans')
})



//setting up port 

//const port=9000;

const PORT=process.env.PORT
app.listen(PORT,()=>{
 
    console.log(chalk.bold.red.inverse('The Server is started on '),PORT)
})


export async function genPassword(password)
{
    const salt=await bcrypt.genSalt(10)

   // console.log(salt)

    const hashedPassword=await bcrypt.hash(password,salt)

    //console.log(hashedPassword)

    return hashedPassword
}

export function validatePassword(password)
{

    const schema= new passwordValidator();

    schema.is().min(8)
    .is().max(15)
    .has().uppercase()
    .has().lowercase()
    .has().digits()
    .has().symbols()
    .has().not().spaces()


const result=schema.validate(password)
console.log(result)
return result
}


