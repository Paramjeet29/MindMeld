import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign,verify} from 'hono/jwt'
import {createPostInput,updatePostInput} from '@paramjeet29/common'
import { cors } from "hono/cors";
import { GoogleGenerativeAI } from '@google/generative-ai'
export const blogRoutes= new Hono<{
    Bindings:{
        DATABASE_URL:string,
        JWT_SECRET:string
        GEMINI_API_KEY:string
      }
      Variables: {
        userId:string
      }
    }
>();
blogRoutes.use(cors({
    origin: 'http://localhost:5173', // Allow only this origin
  }));

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

blogRoutes.use(cors({
    origin: 'http://localhost:5173', // Allow only this origin
  }));

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
            published:body.published,
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

  blogRoutes.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    try {
      const blogs = await prisma.post.findMany({
        include: {
          author: {
            select: {
              name: true
            }
          }
        }
      })
      console.log(blogs)
      if(blogs.length===0){
        c.status(404)
        return c.json("no post exists")
      }
      c.status(200);
      return c.json(blogs)
    } catch (err) {
      c.status(404);
      return c.json({ message: "no post exists" })
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

 
 blogRoutes.delete('/:id',async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
        
    }).$extends(withAccelerate())
    const id=c.req.param('id');
    const userId=c.get('userId');
    try{
      const post=await prisma.post.findUnique({
        where:{
          id,
          authorId:userId
        }
      })
      if(!post){
        c.status(404);
        return c.json({msg:"no post exists"})
      }
      await prisma.post.delete({
        where: {
          id,
        },
      });
  
      c.status(200);
      return c.json({ message: "Blog post deleted successfully" });
    }
    catch(err){
      c.status(500);
      return c.json({ message: "An error occurred while deleting the blog post" });
    }
 })

 blogRoutes.put('/publish/:id',async(c)=>{
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
    
  }).$extends(withAccelerate())
  const id=c.req.param('id');
  const userId=c.get('userId');
  try{
    const post=await prisma.post.findUnique({
      where:{
        id,
        authorId:userId
      }
    })
    if(!post){
      c.status(404);
      return c.json({msg:"no post exists"})
    }
    const publish=post.published;
    await prisma.post.update({
      where: {
        id,
      },
      data:{
        published:!publish
      }
    });

    c.status(200);
    return c.json({ message: "Blog post updated successfully" });
  }
  catch(err){
    c.status(404);
    return c.json({ message: "An error occurred while updating the blog post" });
  }
 })

 blogRoutes.put("/edit/:id",async(c)=>{
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
    
  }).$extends(withAccelerate())
  const id=c.req.param('id');
  const userId=c.get('userId');
  const body=await c.req.json();
  try{
    const post=await prisma.post.findUnique({
      where:{
        id,
        authorId:userId
      }
    })
    if(!post){
      c.status(404);
      return c.json({msg:"no post exists"})
    }
    
    await prisma.post.update({
      where: {
        id,
      },
      data:{
        title:body.title,
        content:body.content
      }
    });

    c.status(200);
    return c.json({ message: "Blog post updated successfully" });
  }
  catch(err){
    c.status(404);
    return c.json({ message: "An error occurred while updating the blog post" });
  }
 })


//  blogRoutes.post("/like",async(c)=>{
//   const prisma = new PrismaClient({
//     datasourceUrl: c.env.DATABASE_URL,
    
//   }).$extends(withAccelerate())
//   const userId=c.get('userId');
//   const {postId}= await c.req.json();

//   try{
//     const response= await prisma.like.create ({
//       data:{
//         user:{connect:{id:userId}},
//         post:{connect:{id:postId}}
//       }
//     })
//     c.status(200);
//     return c.json(response);

//   }
//   catch(err){
//     c.status(500);
//     return c.json({ message: "An error occurred while liking the blog post" });
//   }
//  })
blogRoutes.post("/like", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  
  const userId = c.get('userId');
  const { postId } = await c.req.json();
  
  try {
    if (!userId) {
      c.status(401);
      return c.json({ message: "User not authenticated" });
    }

    const post = await prisma.post.findUnique({
      where: { id: postId }
    });

    if (!post) {
      c.status(404);
      return c.json({ message: "Blog post not found" });
    }

    const response = await prisma.like.create({
      data: {
        user: { connect: { id: userId } },
        post: { connect: { id: postId } }
      }
    });
    
    c.status(200);
    return c.json(response);
  } catch (err) {
    console.error("Error in /like route:", err);
    c.status(500);
    return c.json({ message: "An error occurred while liking the blog post"});
  }
});
 blogRoutes.delete("/like/:postId",async(c)=>{
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
    
  }).$extends(withAccelerate())
  const userId=c.get('userId');
  const postId= c.req.param('postId');

  try{
    const response= await prisma.like.delete ({
      where:{
        userId_postId:{
          userId:userId,
          postId:postId
        }
      }
    })
    c.status(200);
    return c.json(response);

  }
  catch(err){
    c.status(500);
    return c.json({ message: "An error occurred while Disliking the blog post" });
  }
 })

 blogRoutes.get("/like/:postId",async(c)=>{
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
    
  }).$extends(withAccelerate())
  const postId=c.req.param('postId')

  try{
    const response= await prisma.like.findMany ({
      where:{
        postId:postId
      },
      include:{
        user:{
          select:{
            name:true,
            id:true
          }
        }
      }
    })
    c.status(200);
    return c.json(response);

  }
  catch(err){
    c.status(500);
    return c.json({ message: "An error occurred while fetch the likes " });
  }
 })

blogRoutes.post("/generate", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const userId = c.get('userId');
    const { prompt } = await c.req.json();

    if (!prompt) {
      c.status(400);
      return c.json({ error: "Prompt is required" });
    }

    const genAI = new GoogleGenerativeAI(c.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const result = await model.generateContent(`Create a detailed blog post about ${prompt}`);
    const generatedText = result.response.text();
    console.log("Generated text:", generatedText.substring(0, 100) + "...");

    const lines = generatedText.split('\n');
    const generatedTitle = lines[0].replace('## ', '');
    const generatedContent = lines.slice(1).join('\n');
    console.log("Extracted title:", generatedTitle);

    console.log("Creating post in database");
    const post = await prisma.post.create({
      data: {
        title: generatedTitle,
        content: generatedContent,
        published:false,
        authorId: userId
      }
    });
    console.log("Created post:", post);

    return c.json({
      message: "AI-generated post created successfully",
      postId: post.id,
      title: generatedTitle,
      content: generatedContent
    });
  } catch (error) {
    console.error('Error in /generate route:', error);
    c.status(500);
    return c.json({
      error: "Failed to generate content",
      details: error instanceof Error ? error.message : String(error)
    });
  }
});