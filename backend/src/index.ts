// import { Hono } from 'hono'

// import { PrismaClient } from '@prisma/client/edge'
// import { withAccelerate } from '@prisma/extension-accelerate'
// import { verify } from 'hono/jwt'
// import { userRoutes } from './routes/user'
// import { blogRoutes } from './routes/blog'
// import { cors } from 'hono/cors'
// type Variables = {
//   userId: string
// }
// const app = new Hono<{
//   Bindings:{
//     DATABASE_URL:string
//     JWT_SECRET:string
//   },
//   Variables:Variables
// }>();

// app.use('/api/v1/*', cors({
//   origin: [ 
//     'https://mind-meld-2ze4.vercel.app'
//   ],
//   allowHeaders: ['Content-Type', 'Authorization'],
//   allowMethods: ['POST', 'GET', 'OPTIONS', 'PUT', 'DELETE'],
//   exposeHeaders: ['Authorization'],
//   maxAge: 600,
//   credentials: true
// }));
// app.options('*', (c) => {
//   const origin = c.req.headers.get('Origin');
//   const allowedOrigins = ['http://localhost:5173', 'https://mind-meld-2ze4.vercel.app'];

//   if (allowedOrigins.includes(origin)) {
//     c.header('Access-Control-Allow-Origin', origin);
//   }

//   c.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
//   c.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   c.status(204); // No content for preflight requests
//   return c.body('');
// });


// app.route('/api/v1/user',userRoutes)
// app.route('/api/v1/blog',blogRoutes)

// app.post("/api/v1/feedback",async(c)=>{
//   const prisma = new PrismaClient({
//     datasourceUrl: c.env.DATABASE_URL,
//   }).$extends(withAccelerate());

//   const {name,email,feedback,rating}=await c.req.json();
//   try{
//     const response=await prisma.feedback.create({
//       data:{
//         name:name,
//         email:email,
//         content:feedback,
//         rating:rating,
//       }
//     })
//     console.log("Feedback created:",response);
//     c.status(200);
//     return c.json({response});
//   }
//   catch(err){
//     c.status(411);
//     return c.json("cant add feedback");
//   }

// })


// export default app
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
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  },
  Variables: Variables
}>();

app.use('/api/v1/*', cors({
  origin: [ 'http://localhost:5173',
    'https://mind-meld-n5r1lefd6-paramjeet29s-projects.vercel.app'
  ],
  allowHeaders: ['Content-Type', 'Authorization'],
  allowMethods: ['POST', 'GET', 'OPTIONS', 'PUT', 'DELETE'],
  exposeHeaders: ['Authorization'],
  maxAge: 600,
  credentials: true
}));

app.options('*', (c) => {
  const origin = c.req.header('Origin');
  const allowedOrigins = ['http://localhost:5173','https://mind-meld-n5r1lefd6-paramjeet29s-projects.vercel.app'];

  if (typeof origin === 'string' && allowedOrigins.includes(origin)) {
    c.header('Access-Control-Allow-Origin', origin);
  }

  c.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  c.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  c.status(204); // No content for preflight requests
  return c.body('');
});

app.route('/api/v1/user', userRoutes)
app.route('/api/v1/blog', blogRoutes)

app.post("/api/v1/feedback", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const { name, email, feedback, rating } = await c.req.json();
  try {
    const response = await prisma.feedback.create({
      data: {
        name: name,
        email: email,
        content: feedback,
        rating: rating,
      }
    })
    console.log("Feedback created:", response);
    c.status(200);
    return c.json({ response });
  } catch (err) {
    c.status(411);
    return c.json("can't add feedback");
  }
})

export default app
