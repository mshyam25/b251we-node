import express from 'express';
import { getMovies ,createMovies,getMovieById,deleteMovieById,updateMovieById} from '../helper.js';

const router=express.Router();
//get movies by query params and all movies

router.get('/', async (request,response)=>{


    //db.movies.find({language:'english',rating:8})

const filter=request.query
if(filter.rating)
{
    filter.rating=+filter.rating
}
    const movies = await getMovies(filter)

response.send(movies)
console.log(request.query)
  })


   //movie search by id

   router.get('/:id',async (request,response)=>{

    const {id}=request.params;
    console.log(id)

    const movie= await getMovieById(id)

  movie ?  response.send(movie) : response.status(404).send('No Matching movie')
   
  })

  //create movies

  router.post('/', async (request,response)=>{


    const data=request.body;
 

    //db.movies.insertMany

   const result = await createMovies(data);

response.send(result)
  })
//delete by id
  router.delete('/:id',async (request,response)=>{

    //db.collections.deleteOne({id:101})
    
    const {id}=request.params
    
    const result= await deleteMovieById(id)

    response.send(result)
    })


//update rating by id

router.put('/:id',async(request,response)=>{

  //db.collections.updateOne({id:101},{$set: {rating: 8}})
const data=request.body
  const {id}=request.params
console.log(id)
  const movie= await updateMovieById(id,data)

  response.send(movie)

  //movie ?  response.send(movie) : response.status(404).send('No Matching movie')
})

  export const moviesRouter=router
