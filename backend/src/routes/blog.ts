
import {sign, jwt,verify, decode } from 'hono/jwt'
import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import {withAccelerate}from '@prisma/extension-accelerate'
import app from '../index';
import { Context } from 'hono/jsx';
export const blogRouter =new Hono<{
	Bindings: {
		DATABASE_URL: string,
    SECRET:string
	},Variables :{
		userId: string
	}
}>()



//Get all blogs 
///Adding pagination
blogRouter.get('/bulk/:page', async(c) => {
  const perPage = 10;
  const p = c.req.query('page') || ""
  let page = parseInt(p);
  if(page < 1 || p === "") {page = 1; }
  
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  
  const blogs = await prisma.post.findMany({
    select : {
      id:true,
      title:true,
      content: true,
      createdAt:true,
      author:{
        select: {
          name:true,
          about:true
        }
      }
    }
  });
  if(!c.req.param ){
    
    return c.json({
    posts: ( blogs),
    page,
    pageCount:1
  });}
  const pageCount = Math.ceil(( blogs).length / perPage);
  if(page > pageCount) page = pageCount;

  const from = perPage * (page - 1); 
  let to =  perPage * page; 
  if(to < 0) to = 0;

   return c.json({
    posts: ( blogs).slice(from, to).reverse(),
    page,
    pageCount
  });
})


blogRouter.get('/:id', async(c) => {
  const id = c.req.param('id')
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const authorId =  c.get('userId')

  const blog = await prisma.post.findUnique({
    where: {
      id:id
    }
    ,
    select:{
      id: true,
      title: true,
      content: true,
      createdAt:true,
      author:{
          select:{
            name: true,
            about:true
          }
      }
    }
  })
	return c.json({ blog : blog });
})


blogRouter.post('/blog', async(c) => {
  const body =await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const authorId =  c.get('userId')
  try{
    const blog = await prisma.post.create({
      data: {
        title: body.title,
        content:body.content,
        authorId: authorId
      }
    })
    return c.json({id:blog.id})
  }
  catch(e){
    return c.json({
      message:"Blog not created!"
    })
  }
})

blogRouter.delete('/delete/:id',async(c)=>{

  const id = c.req.param('id')
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try{
    const response = await prisma.post.delete({
      where: {
        id:id
      },
    })
    c.status(200);
    return c.json({
      "success":"success"
    })
  }
  catch(e){
    return c.json({
      e
    })
  }
})

blogRouter.put('/blog', async(c) => {
  const body =await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const blog = await prisma.post.update({
    where:{
      id: body.id
    },
    data: {
      title: body.title,
      content:body.content,
    }
  })
	return c.json({id:blog.id})
})

blogRouter.post('/dashboard', async (c)=>{
  const prisma = new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL
  }).$extends(withAccelerate());
 
  try{
    const authorId = c.get('userId');
   
    const blogs = await prisma.post.findMany({
      where:{
        authorId:  authorId
      },
      
    })
    return c.json({
     blogs
    })
  }catch(e){
    return c.json({
      message:e
    })
  }
})