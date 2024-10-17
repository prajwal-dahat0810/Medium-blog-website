import { Hono } from 'hono';
import {userRouter} from './routes/user'
import {blogRouter} from './routes/blog'
import { cors } from 'hono/cors'

import { authorize } from './middleware/middlewares';

export const app = new Hono<{
	Bindings: {
		DATABASE_URL: string,
    SECRET:string
	},Variables : {
		userId: string
	}
}>()	
app.use('/*', cors())

app.use('/api/v1/blog/*',authorize)


app.route('api/v1/user', userRouter);
app.route('api/v1/blog', blogRouter);


export default app;
function required(p0: string) {
	throw new Error('Function not implemented.');
}

