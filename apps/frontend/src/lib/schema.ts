import { pgTable, serial, text, timestamp, integer, jsonb } from 'drizzle-orm/pg-core';

export const leads = pgTable('leads', {
  id: serial('id').primaryKey(),
  email: text('email').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const onboardingUsers = pgTable('onboarding_users', {
  id: serial('id').primaryKey(),
  walletAddress: text('wallet_address').notNull(),
  role: text('role').notNull(), // 'doctor' or 'association'
  step: integer('step').default(1),
  status: text('status').default('pending'), // 'pending', 'approved', 'rejected'
  data: jsonb('data'), // stores Basic Data and Documentation/CRM/CNPJ
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const prescriptionsMetadata = pgTable('prescriptions_metadata', {
  id: serial('id').primaryKey(),
  tokenId: integer('token_id').notNull(),
  patientAddress: text('patient_address').notNull(),
  doctorAddress: text('doctor_address').notNull(),
  metadataUri: text('metadata_uri').notNull(), // IPFS link
  status: text('status').default('active'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const transactions = pgTable('transactions', {
    id: serial('id').primaryKey(),
    userAddress: text('user_address').notNull(),
    type: text('type').notNull(), // 'purchase', 'mint', etc.
    details: text('details'),
    amount: text('amount'),
    createdAt: timestamp('created_at').defaultNow(),
});
