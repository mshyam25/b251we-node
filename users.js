import express from 'express';

import { client } from './index.js';
import bcrypt from 'bcrypt';
import { genPassword ,validatePassword} from './index.js';
import {createUser,userExists,validPassword} from './helper.js';
import jwt from 'jsonwebtoken';

const router=express.Router();
//get movies by query params and all movies

router.route('/signup').post(async (request,response)=>{

    const {username,password}=request.body

   const isuserExist=await userExists(username)
  
   if(isuserExist)
   {
     
     response.status(400).send({message:'Username already exists 🥲'})
   }
   else 
   {
   
    if(validatePassword(password))
    {
      console.log(validatePassword(password))
      const hashedPassword=await genPassword(password);
      
      const result=await createUser({username:username,password:hashedPassword});
      
      response.send(result)
    }
    else{
      response.status(404).send({message:'Password is weak 🥲 !Password must be minimum 8 and maximum 15 characters with an Uppercase, a lowercase, a digit and a symbol.'})
    }
    
   }
  })

router.route('/signin').get(async (request,response)=>{

  const {username,password}=request.body

  const usernameValid=await userExists(username)

  if(usernameValid)
  {
    const storedPassword=usernameValid.password
    const validatePassword=await validPassword(password,storedPassword)
   
    if(validatePassword===false)
    {
    response.status(401).send({message: 'Invalid Credentials🤯'})
    return
    }
    else{
      const token=await jwt.sign({id:usernameValid._id},process.env.SECRET_KEY)
      response.status(200).send({message:'Successful login',
    token:token})
    }
  }
  else
  {

    response.status(401).send({message: 'Invalid Credentials🧐'})
    return
  }
})

  export const usersRouter=router
