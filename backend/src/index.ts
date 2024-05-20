import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {sign, jwt,verify } from 'hono/jwt'
import {userRouter} from './routes/user'
import {blogRouter} from './routes/blog'
import { cors } from 'hono/cors'

export const app = new Hono<{
	Bindings: {
		DATABASE_URL: string,
    SECRET:string
	},Variables : {
		userId: string
	}
}>()
app.use('/*', cors())

app.use('/api/v1/blog/*',async(c, next) =>{
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
})






app.get('/', c => {return c.json({msg:"working fine"})});
app.route('api/v1/user', userRouter);
app.route('api/v1/blog', blogRouter);


/// Writing Blog routes

export default app;