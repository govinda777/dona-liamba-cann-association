import { Vercel } from '@vercel/sdk';

const vercel = new Vercel({
  bearerToken: process.env.VERCEL_TOKEN || '',
});

const TEAM_ID = process.env.VERCEL_TEAM_ID;
const REPO_ID = process.env.GITHUB_REPO_ID; // GitHub repo ID string or number

interface EnvVar {
  key: string;
  value: string;
  type: 'plain' | 'encrypted';
  target: ('production' | 'preview' | 'development')[];
}

interface ProjectConfig {
  name: string;
  rootDirectory: string;
  framework: 'nextjs' | null;
  buildCommand?: string;
  serverlessFunctionRegion: string;
  envVars: EnvVar[];
}

const projects: ProjectConfig[] = [
  {
    name: 'dona-liamba-frontend',
    rootDirectory: 'apps/frontend',
    framework: 'nextjs',
    serverlessFunctionRegion: 'gru1',
    envVars: [
      {
        key: 'NEXT_PUBLIC_PRIVY_APP_ID',
        value: process.env.PRIVY_APP_ID || '',
        type: 'plain',
        target: ['production', 'preview', 'development'],
      },
      {
        key: 'NEXT_PUBLIC_API_URL',
        value: 'https://api.dona-liamba.com',
        type: 'plain',
        target: ['production'],
      },
      {
        key: 'NEXT_PUBLIC_API_URL',
        value: 'https://api-preview.dona-liamba.com',
        type: 'plain',
        target: ['preview'],
      },
    ],
  },
  {
    name: 'dona-liamba-api',
    rootDirectory: 'apps/api',
    framework: null,
    serverlessFunctionRegion: 'gru1',
    envVars: [
      {
        key: 'PRIVY_APP_ID',
        value: process.env.PRIVY_APP_ID || '',
        type: 'plain',
        target: ['production', 'preview', 'development'],
      },
      {
        key: 'PRIVY_APP_SECRET',
        value: process.env.PRIVY_APP_SECRET || '',
        type: 'encrypted',
        target: ['production', 'preview'],
      },
      {
        key: 'DATABASE_URL',
        value: process.env.DATABASE_URL || '',
        type: 'encrypted',
        target: ['production', 'preview'],
      },
      {
        key: 'SUPABASE_URL',
        value: process.env.SUPABASE_URL || '',
        type: 'plain',
        target: ['production', 'preview', 'development'],
      },
      {
        key: 'SUPABASE_SERVICE_ROLE_KEY',
        value: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
        type: 'encrypted',
        target: ['production', 'preview'],
      },
      {
        key: 'MEMED_API_KEY',
        value: process.env.MEMED_API_KEY || '',
        type: 'encrypted',
        target: ['production', 'preview'],
      },
    ],
  },
  {
    name: 'dona-liamba-admin',
    rootDirectory: 'apps/admin',
    framework: 'nextjs',
    serverlessFunctionRegion: 'gru1',
    envVars: [
      {
        key: 'NEXT_PUBLIC_PRIVY_APP_ID',
        value: process.env.PRIVY_APP_ID || '',
        type: 'plain',
        target: ['production', 'preview'],
      },
      {
        key: 'DATABASE_URL',
        value: process.env.DATABASE_URL || '',
        type: 'encrypted',
        target: ['production', 'preview'],
      },
    ],
  },
];

async function setup() {
  if (!process.env.VERCEL_TOKEN) {
    console.error('❌ VERCEL_TOKEN missing in environment');
    process.exit(1);
  }

  for (const config of projects) {
    try {
      console.log(`🚀 Criando/Configurando projeto: ${config.name}...`);

      let project;
      try {
        project = await vercel.projects.getProject({
          idOrName: config.name,
          teamId: TEAM_ID,
        });
        console.log(`✅ Projeto ${config.name} já existe.`);
      } catch (e) {
        // Create project if it doesn't exist
        project = await vercel.projects.createProject({
          teamId: TEAM_ID,
          requestBody: {
            name: config.name,
            framework: config.framework,
            rootDirectory: config.rootDirectory,
          },
        });
        console.log(`✨ Projeto ${config.name} criado com sucesso.`);
      }

      const projectId = project.id;

      // Update project settings
      await vercel.projects.updateProject({
        idOrName: projectId,
        teamId: TEAM_ID,
        requestBody: {
          framework: config.framework,
          rootDirectory: config.rootDirectory,
          serverlessFunctionRegion: config.serverlessFunctionRegion,
          ...(config.buildCommand ? { buildCommand: config.buildCommand } : {}),
        },
      });
      console.log(`⚙️ Configurações de ${config.name} atualizadas.`);

      // Link to GitHub if REPO_ID is provided
      if (REPO_ID) {
        // Using any because SDK types for gitRepository might be tricky
        await vercel.projects.updateProject({
            idOrName: projectId,
            teamId: TEAM_ID,
            requestBody: {
                link:{
                    type: 'github',
                    repoId: REPO_ID,
                } as any
            }
        });
        console.log(`🔗 Projeto ${config.name} vinculado ao GitHub.`);
      } else {
        console.log(`⚠️ GITHUB_REPO_ID não fornecido. Pulei o vínculo com o GitHub.`);
      }

      // Upsert Env Vars
      for (const env of config.envVars) {
        try {
          await vercel.projects.createProjectEnv({
            idOrName: projectId,
            teamId: TEAM_ID,
            upsert: 'true',
            requestBody: {
              key: env.key,
              value: env.value,
              type: env.type,
              target: env.target,
            },
          });
          console.log(`🔑 Env var ${env.key} configurada.`);
        } catch (envError) {
          console.error(`❌ Erro ao configurar env var ${env.key}:`, envError);
        }
      }

      console.log(`✅ Projeto ${config.name} sincronizado com sucesso!\n`);
    } catch (error) {
      console.error(`💥 Erro crítico no projeto ${config.name}:`, error);
    }
  }
}

setup().catch(console.error);
