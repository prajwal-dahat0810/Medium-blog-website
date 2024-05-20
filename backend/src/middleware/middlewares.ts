import app from '../index'
import { blogRouter } from "../routes/blog";
import { verify } from "hono/jwt";

// app.use('*/api/v1/blog/*',async(c, next) =>{
//     const header =  c.req.header('authorization') || ""
//     if (!header) {
//           c.status(401);
//           return c.json({ error: "unauthorized" });
//       }
//     const token = header.split(' ')[1];
//     try{
//       const  user =await  verify(token,c.env.SECRET )
//       try{
//           if (!user) {
//                   c.status(401);
//                   return c.json({ error: "You are not logged in" });
//                 }
//               c.set('userId', user.id);
//               await next()
//         }
//         catch(error:any){
//               c.status(401);
//               return  c.json({message:"unauthorized"});
//             }
//         }
//       catch(error:any){
//       return  c.json({message:"You are not logged in"});
//     }
// })






// userRouter.use('/*',async(c, next) =>{
 
//     const header =  c.req.header('authorization') || ""
//     if (!header) {
//           c.status(401);
//           return c.json({ error: "unauthorized" });
//       }
//     const token = header.split(' ')[1];
    
//     try{
//       const  payload =await  verify(token,c.env.SECRET )
//       if (!payload) {
//         c.status(401);
//         return c.json({ error: "unauthorized" });
//       }
//       c.set('userId', payload.id);
//       await next()
      
  
//     }catch(error:any){
//       c.status(401);
//       return  c.json({message:"unauthorized"});
//     }
    
//   })
  