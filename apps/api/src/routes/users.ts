import { Hono } from 'hono';
import { createClient } from '@supabase/supabase-js';
import { requireAuth } from '../lib/auth.js';

const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const users = new Hono();

users.post('/register', requireAuth, async (c) => {
  const userContext = c.get('user');
  const privyUserId = userContext.id;
  const role = userContext.role || 'paciente';

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

  // Check if user already exists
  const { data: existingUser } = await supabase
    .from('onboarding_users')
    .select('*')
    .eq('privy_user_id', privyUserId)
    .single();

  if (existingUser) {
    return c.json({ user: existingUser });
  }

  // Create new user
  const { data: newUser, error } = await supabase
    .from('onboarding_users')
    .insert([{ privy_user_id: privyUserId, role }])
    .select()
    .single();

  if (error) {
    console.error('Error creating user:', error);
    return c.json({ error: 'Internal Server Error' }, 500);
  }

  return c.json({ user: newUser });
});

users.get('/me', requireAuth, async (c) => {
  const userContext = c.get('user');
  const privyUserId = userContext.id;

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
  const { data: user, error } = await supabase
    .from('onboarding_users')
    .select('*')
    .eq('privy_user_id', privyUserId)
    .single();

  if (error) {
    return c.json({ error: 'User not found' }, 404);
  }

  return c.json({ user });
});

export default users;
