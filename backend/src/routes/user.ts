import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign} from 'hono/jwt'
import {signInInput,signUpInput} from '@paramjeet29/common'
import { cors } from "hono/cors";
export const userRoutes=new Hono<{
    Bindings:{
        DATABASE_URL:string,
        JWT_SECRET:string
      }
    }>();

    userRoutes.use(cors({
      origin: 'http://localhost:5173', // Allow only this origin
    }));

    
userRoutes.post('/signup',async(c)=>{
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  
    const body=await c.req.json();
    const {success}=signUpInput.safeParse(body);
    if (!success) {
      c.status(400);
      return c.json({ error: "invalid input" });
    }
    try{
      const user = await prisma.user.create({
        data:{
          email:body.email,
          name:body.name,
          password:body.password
        }
      })
      const token = await sign({id: user.id}, c.env.JWT_SECRET)
      c.header('Authorization',"Bearer "+`${token}`);
      return c.json({name:user.name,email:user.email,id:user.id})
    }
    catch(err:any){
       c.status(403)
       return c.json({message:err.message})
    }
  })

  userRoutes.post('/signin',async(c)=>{
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    const body=await c.req.json();
    const {success}=signInInput.safeParse(body);
    if (!success) {
      c.status(400);
      return c.json({message:"wrong input"});
    }
    try{
      const user=await prisma.user.findFirst({
        where:{
          email:body.email,
          password:body.password
        }
      })
      if(!user){
        return c.status(403)
      }
      const token =await sign({id:user.id},c.env.JWT_SECRET)
      c.header('Authorization',"Bearer "+`${token}`);
      c.header('Access-Control-Expose-Headers', 'authorization');
      return c.json({name:user.name,email:user.email,id:user.id})
    }
    catch(err){
      return c.json({
        message:"Invalid credentials for login"
      })
    }
  })
  