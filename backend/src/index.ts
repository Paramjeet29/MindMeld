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

app.use('/api/v1/blog/*', async (c, next) => {
	const jwt = c.req.header('Authorization');
	if (!jwt) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
	const token = jwt.split(' ')[1];
	const payload = await verify(token, c.env.JWT_SECRET);
	if (!payload) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
	c.set('userId', payload.id);
	await next()
})

app.route('/api/v1/user',userRoutes)
app.route('/api/v1/blog',blogRoutes)

//middleware



export default app
