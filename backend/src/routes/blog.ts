import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign,verify} from 'hono/jwt'
import {createPostInput, CreatePostInput,updatePostInput,UpdatePostInput} from '@paramjeet29/common'

export const blogRoutes= new Hono<{
    Bindings:{
        DATABASE_URL:string,
        JWT_SECRET:string
      }
      Variables: {
        userId:string
      }
    }
>();


blogRoutes.use('/*', async (c, next) => {
	const jwt = c.req.header('Authorization');
	if (!jwt) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
	const token = jwt.split(' ')[1];
	const payload:any = await verify(token, c.env.JWT_SECRET);
	if (!payload) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
    else{
        c.set("userId",payload.id)
        return await next();
    }  
})



blogRoutes.post('/',async(c)=>{
    const userId=c.get('userId');
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
        
    }).$extends(withAccelerate())
    const body=await c.req.json();
    const {success}=createPostInput.safeParse(body);
    if(!success){
        c.status(400);
        return c.json("wrong input");
    }
    
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
    const {success}=updatePostInput.safeParse(body);
    if(!success){
        c.status(400);
        return c.json("wrong input");
    }
    try{
        const updatedPost= await prisma.post.update({
            where: {
                id:body.id,
                authorId:userId
            },
            data:{
                title:body.title,
                content:body.content
            }
        })
        return c.json({ message: "Blog updated successfully", post: updatedPost });
    }
    catch(err:any){
        c.status(400)
        return c.json({message:err.message})
    }
  })
  blogRoutes.get('/bulk',async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
        
    }).$extends(withAccelerate())

    try{
        const blog=await prisma.post.findMany()
        c.status(200);
        return c.json(blog)
    }
    catch(err){
        c.status(404);
        return c.json({message:"no post exists"})
    }
  })
  blogRoutes.get('/:id',async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
        
    }).$extends(withAccelerate())
    const id=c.req.param('id');
    try{
        const blog=await prisma.post.findUnique({
            where:{
                id
            }
        })
        c.status(200)
        return c.json({blog})
    }
    catch(err:any){
        c.status(404);
        c.json({message:err.message})
    }
  })
  
