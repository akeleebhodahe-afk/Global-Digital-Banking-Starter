import Fastify from 'fastify';
import cors from '@fastify/cors';
import {
  demoAccounts,
  demoProfile,
  demoTransfers,
  knowledge,
  membershipPlans,
  resources
} from './data/content.js';

const errorSchema = {
  type: 'object',
  required: ['error'],
  properties: {
    error: {
      type: 'object',
      required: ['code', 'message', 'requestId'],
      properties: {
        code: { type: 'string' },
        message: { type: 'string' },
        requestId: { type: 'string' }
      }
    }
  }
};

const collectionSchema = {
  type: 'object',
  required: ['data', 'meta'],
  properties: {
    data: { type: 'array' },
    meta: { type: 'object', required: ['count'], properties: { count: { type: 'integer', minimum: 0 } } }
  }
};

function collection(items) {
  return { data: items, meta: { count: items.length } };
}

export function buildApp(options = {}) {
  const app = Fastify({ logger: options.logger ?? false, requestIdHeader: 'x-request-id' });
  const corsOrigin = options.corsOrigin ?? process.env.CORS_ORIGIN ?? 'http://localhost:8080';

  app.register(cors, { origin: corsOrigin });
  app.addHook('onSend', async (request, reply) => reply.header('x-request-id', request.id));

  app.get('/api/health', {
    schema: {
      response: { 200: { type: 'object', required: ['status', 'service', 'version', 'requestId'], properties: { status: { type: 'string' }, service: { type: 'string' }, version: { type: 'string' }, requestId: { type: 'string' } } } }
    }
  }, async (request) => ({ status: 'ok', service: 'globalbank-api', version: '0.1.0', requestId: request.id }));

  app.get('/api/knowledge', { schema: { response: { 200: collectionSchema } } }, async () => collection(knowledge));
  app.get('/api/knowledge/:slug', {
    schema: { params: { type: 'object', additionalProperties: false, required: ['slug'], properties: { slug: { type: 'string', minLength: 1, pattern: '^[a-z0-9]+(?:-[a-z0-9]+)*$' } } } }
  }, async (request, reply) => {
    const article = knowledge.find((item) => item.slug === request.params.slug);
    if (!article) return reply.code(404).send({ error: { code: 'NOT_FOUND', message: 'Knowledge article not found', requestId: request.id } });
    return { data: article };
  });
  app.get('/api/resources', { schema: { response: { 200: collectionSchema } } }, async () => collection(resources));
  app.get('/api/membership/plans', { schema: { response: { 200: collectionSchema } } }, async () => collection(membershipPlans));

  // Prototype-only read routes. No authentication or financial state is used.
  app.get('/api/demo/profile', async () => ({ data: demoProfile, meta: { prototypeOnly: true } }));
  app.get('/api/demo/accounts', { schema: { response: { 200: collectionSchema } } }, async () => collection(demoAccounts));
  app.get('/api/demo/transfers', { schema: { response: { 200: collectionSchema } } }, async () => collection(demoTransfers));

  app.setErrorHandler((error, request, reply) => {
    if (error.validation) return reply.code(400).send({ error: { code: 'VALIDATION_ERROR', message: 'Request validation failed', requestId: request.id } });
    request.log.error(error);
    return reply.code(error.statusCode >= 400 && error.statusCode < 500 ? error.statusCode : 500).send({ error: { code: 'INTERNAL_ERROR', message: 'An unexpected error occurred', requestId: request.id } });
  });
  app.setNotFoundHandler((request, reply) => reply.code(404).send({ error: { code: 'NOT_FOUND', message: `Route ${request.method} ${request.url} not found`, requestId: request.id } }));
  return app;
}
