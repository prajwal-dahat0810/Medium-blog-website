
import { verify } from "hono/jwt";
import { Context, Next } from 'hono';

export async function authorize(c:Context, next:Next){
    const header =  c.req.header('authorization') || ""
    if (!header) {
          c.status(401);
          return c.json({ error: "unauthorized" });
      }
    const token = header.split(' ')[1];
    try{
      const  user =await  verify(token,c.env.SECRET )
      
      try{
          if (!user) {
                  c.status(401);
                  return c.json({ error: "You are not logged in" });
                }

            c.set('userId', user.id);
              await next()
        }
        catch(error:any){
              c.status(401);
              return  c.json({message:"unauthorized"});
            }
        }
      catch(error:any){
      return  c.json({message:"You are not logged in"});
    }
}


  