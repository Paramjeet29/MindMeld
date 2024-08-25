import { Hono } from 'hono'

import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt'
import { userRoutes } from './routes/user'
import { blogRoutes } from './routes/blog'
import { cors } from 'hono/cors'
type Variables = {
  userId: string
}
const app = new Hono<{
  Bindings:{
    DATABASE_URL:string
    JWT_SECRET:string
  },
  Variables:Variables
}>();
app.use(cors({
  origin: 'http://localhost:5173', // Allow only this origin
}));


app.route('/api/v1/user',userRoutes)
app.route('/api/v1/blog',blogRoutes)

app.post("/api/v1/feedback",async(c)=>{
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const {name,email,feedback,rating}=await c.req.json();
  try{
    const response=await prisma.feedback.create({
      data:{
        name:name,
        email:email,
        content:feedback,
        rating:rating,
      }
    })
    console.log("Feedback created:",response);
    c.status(200);
    return c.json({response});
  }
  catch(err){
    c.status(411);
    return c.json("cant add feedback");
  }

})


export default app
