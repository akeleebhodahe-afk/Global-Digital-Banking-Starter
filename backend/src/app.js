import Fastify from 'fastify';
import cors from '@fastify/cors';
import { knowledge, membershipPlans, resources } from './data/content.js';

export function buildApp(options = {}) {
  const app = Fastify({ logger: options.logger ?? false });
  const corsOrigin = options.corsOrigin ?? process.env.CORS_ORIGIN ?? 'http://localhost:8080';

  app.register(cors, { origin: corsOrigin });

  app.get('/api/health', {
    schema: {
      response: {
        200: {
          type: 'object',
          required: ['status', 'service', 'version'],
          properties: {
            status: { type: 'string' },
            service: { type: 'string' },
            version: { type: 'string' }
          }
        }
      }
    }
  }, async () => ({
    status: 'ok',
    service: 'globalbank-api',
    version: '0.1.0'
  }));

  app.get('/api/knowledge', async () => ({ data: knowledge }));
  app.get('/api/knowledge/:slug', {
    schema: { params: { type: 'object', required: ['slug'], properties: { slug: { type: 'string', minLength: 1 } } } }
  }, async (request, reply) => {
    const article = knowledge.find((item) => item.slug === request.params.slug);
    if (!article) return reply.code(404).send({ error: { code: 'NOT_FOUND', message: 'Knowledge article not found' } });
    return { data: article };
  });
  app.get('/api/resources', async () => ({ data: resources }));
  app.get('/api/membership/plans', async () => ({ data: membershipPlans }));

  app.setNotFoundHandler((request, reply) => reply.code(404).send({
    error: { code: 'NOT_FOUND', message: `Route ${request.method} ${request.url} not found` }
  }));

  return app;
}
