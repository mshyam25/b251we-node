import { client } from './index.js';

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
  
   async function getMovieById(id) {
    return await client.db('b251we')
      .collection('movies')
      .findOne({ id: +id });
  }

  async function deleteMovieById(id){

    return await client.db('b251we')
    .collection('movies')
    .deleteOne({id: +id})
  }

  async function updateMovieById(id,data){

    return await client.db('b251we')
    .collection('movies')
    .updateOne({id: +id},{$set: data})
  }

  export {getMovieById,createMovies,getMovies,deleteMovieById,updateMovieById}