import { handle } from 'hono/vercel';
import app from '../index.js';

export const config = {
  runtime: 'edge',
};

export default handle(app);
