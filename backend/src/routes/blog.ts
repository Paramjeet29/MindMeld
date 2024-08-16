import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign} from 'hono/jwt'

type Variables = {
    userId: string
  }
export const blogRoutes= new Hono<{
    Bindings:{
        DATABASE_URL:string,
        JWT_SECRET:string
      }
      Variables: Variables
    }
>();



blogRoutes.post('/',async(c)=>{
    const userId=c.get('userId');
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
        
    }).$extends(withAccelerate())
    const body=await c.req.json();
    
    const blog=await prisma.post.create({
        data:{
            title:body.title,
            content:body.content,
            authorId:userId,
        }})

        return c.json({
            id:blog.id
        })
  })

  blogRoutes.put('/',async(c)=>{
    const userId=c.get('userId');
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
        
    }).$extends(withAccelerate())

    const body=await c.req.json();

    try{
        await prisma.post.update({
            where: {
                id:userId
            },
            data:{
                title:body.title,
                content:body.content
            }
        })
    }
    catch(err:any){
        c.status(400)
        return c.json({message:err.message})
    }
  })
  
  blogRoutes.get('/:id',async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
        
    }).$extends(withAccelerate())
    const id=c.req.param('id');
    try{
        const blog=await prisma.post.findMany({
            where:{
                id:id
            }
        })
        c.status(200)
        return c.json(blog)
    }
    catch(err:any){
        c.status(404);
        c.json({message:err.message})
    }
  })
  
  blogRoutes.get('/bulk',async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
        
    }).$extends(withAccelerate())

    try{
        const blog=await prisma.post.findMany({})
        c.status(200);
        return c.json(blog)
    }
    catch(err){
        c.status(404);
        return c.json({message:"no post exists"})
    }
    
  })