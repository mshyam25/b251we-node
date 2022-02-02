import { client } from './index.js';
import bcrypt from 'bcrypt';
import {ObjectId} from 'mongodb';
 async function getMovies(filter) {
  return await client.db('b251we')
    .collection('movies')
    .find(filter) // returns cursor -> pagination
    .toArray();
}

  async function createMovies(data) {
    return await client.db('b251we')
        .collection('movies')
        .insertMany(data);
}

async function createUser(data) {
  return await client.db('b251we')
      .collection('users')
      .insertOne(data);
}


async function userExists(username){

  return await client.db('b251we')
  .collection('users')
  .findOne({username:username})
}

async function validPassword(password,storedPassword)
{
  const validity=await bcrypt.compare(password,storedPassword)
  return validity
}

  
   async function getMovieById(id) {
    return await client.db('b251we')
      .collection('movies')
      .findOne({ _id: ObjectId(id) });
  }

  async function deleteMovieById(id){

    return await client.db('b251we')
    .collection('movies')
    .deleteOne({_id: ObjectId(id)})
  }

  async function updateMovieById(id,data){

    return await client.db('b251we')
    .collection('movies')
    .updateOne({_id: ObjectId(id)},{$set: data})
  }

  export {getMovieById,createMovies,getMovies,deleteMovieById,updateMovieById,createUser,userExists,validPassword}