import { Hono } from 'hono'

import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt'
import { userRoutes } from './routes/user'
import { blogRoutes } from './routes/blog'

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


app.route('/api/v1/user',userRoutes)
app.route('/api/v1/blog',blogRoutes)

//middleware



export default app
