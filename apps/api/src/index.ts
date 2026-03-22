import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import users from './routes/users.js';

const app = new Hono();

app.get('/api/health', (c) => c.json({ status: 'ok' }));

app.route('/api/users', users);

if (process.env.NODE_ENV !== 'production') {
  const port = 3001;
  console.log(`Server is running on port ${port}`);
  serve({
    fetch: app.fetch,
    port,
  });
}

export default app;
