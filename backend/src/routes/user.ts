import { Hono } from "hono"
import {sign, jwt,verify } from 'hono/jwt'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { signupInput,  signinInput } from "@dahatdevs/medium-common"
import { authorize } from "../middleware/middlewares"

export const userRouter =new Hono<{
	Bindings: {
		DATABASE_URL: string,
    SECRET:string
	},Variables : {
		userId: string
	}
}>()


userRouter.post('/signup', async(c) => {
    const prisma = new PrismaClient({
          datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())
      
    const body = await c.req.json()
    const {success} = signupInput.safeParse({
      username: body.username,
      password:body.password,
      name:body.name
    });
    if(!success){
      c.status(411)
      return c.json({
        message : "Invalid Input"
      })
    }
    const userExist  = prisma.user.findUnique({
      where:{
        email : body.username,
        password: body.password
      }
    })
    if(!userExist){
      c.status(409)
      return c.json({
        message : "Email already exist"
      })
    } 
   try{ const user  =await prisma.user.create({
        data:{
          email: body.username,
          password: body.password,
          name: body.name
        }
      })
    const token  = await sign({
          id:user.id
        },c.env.SECRET)
        c.status(200)
	  return c.json({token : token })
  }
    catch(e){
      return c.json({massage:e})
    }
})

userRouter.post('/signin', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,

      }).$extends(withAccelerate())
    
    const body  = await c.req.json();
    const { success } = signinInput.safeParse({
        username: body.username,
        password:body.password
      })
    if(!success){
      return c.json({
        message : "Input is invalid"
      })
    }
    const user  = await prisma.user.findFirst({
      where:{
        email: body.username,
        password: body.password
      }
    })
    if(!user){
      return c.json({
        message: "Invalid Username or password"
      })
    }
    const token = await sign({
            id: user.id
          }, c.env.SECRET)
    c.status(200)
    return c.json({token: token })
})

userRouter.post('/me', authorize,async(c:any)=>{
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,

    }).$extends(withAccelerate())
     const userId = c.get('userId');
    const user = await prisma.user.findUnique({
      where:{
        id:userId
      },select: {
        email: true,
        name: true,
        about:true
       },
    
    })
      try{
          return c.json({user:user})
        }
        catch(error:any){
              c.status(401);
              return  c.json({message:"unauthorized"});
            }
})

userRouter.put('/update', authorize, async(c:any)=>{
  const body =  await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,

  }).$extends(withAccelerate())
   const userId = c.get('userId');
   try{
      const response = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          about:body.about,
        },
      })
      if(!response.about){
        c.status(500)
        return c.json({message:"About update failed"})
      }
      c.status(200)
        return c.json({user:response})
      }
      catch(error:any){
            c.status(500);
            return  c.json({message:"Internal Server Error"});
          }
})
 