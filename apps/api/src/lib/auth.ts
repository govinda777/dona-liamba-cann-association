import { createRemoteJWKSet, jwtVerify } from 'jose';
import type { Context, Next } from 'hono';
import { createClient } from '@supabase/supabase-js';

const PRIVY_APP_ID = process.env.PRIVY_APP_ID;
const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const JWKS = createRemoteJWKSet(
  new URL(`https://auth.privy.io/api/v1/apps/${PRIVY_APP_ID}/jwks.json`)
);

export async function verifyPrivyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWKS, {
      issuer: 'privy.io',
      audience: PRIVY_APP_ID,
    });
    return payload;
  } catch (error) {
    console.error('JWT Verification Error:', error);
    return null;
  }
}

export const requireAuth = async (c: Context, next: Next) => {
  const authHeader = c.req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({ error: 'Unauthorized: Missing or invalid token' }, 401);
  }

  const token = authHeader.split(' ')[1];
  const payload = await verifyPrivyToken(token);

  if (!payload) {
    return c.json({ error: 'Unauthorized: Invalid token' }, 401);
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
  const { data: user, error } = await supabase
    .from('onboarding_users')
    .select('role')
    .eq('privy_user_id', payload.sub)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Supabase Error:', error);
  }

  c.set('user', {
    id: payload.sub,
    role: user?.role || 'paciente',
  });

  await next();
};
