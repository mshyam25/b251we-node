
import jwt from 'jsonwebtoken';

export const auth=(request,response,next)=>{
try 
{ 
    
    const token=request.header('x-auth-token')
    const msg = jwt.verify(token,process.env.SECRET_KEY)
    next()

}
catch(e)
{
    response.status(401).send({error:e.message})
}
    
}