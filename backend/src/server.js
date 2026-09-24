import Fastify from 'fastify';
import cors from '@fastify/cors';
import { knowledge, membershipPlans, resources } from './data/content.js';

const app = Fastify({ logger: true });
const port = Number(process.env.PORT || 4000);
const host = process.env.HOST || '127.0.0.1';

await app.register(cors, {
  origin: process.env.CORS_ORIGIN || 'http://localhost:8080'
});

app.get('/api/health', async () => ({
  status: 'ok',
  service: 'globalbank-api',
  version: '0.1.0'
}));

app.get('/api/knowledge', async () => ({ data: knowledge }));
app.get('/api/knowledge/:slug', async (request, reply) => {
  const article = knowledge.find((item) => item.slug === request.params.slug);
  if (!article) return reply.code(404).send({ error: { code: 'NOT_FOUND', message: 'Knowledge article not found' } });
  return { data: article };
});
app.get('/api/resources', async () => ({ data: resources }));
app.get('/api/membership/plans', async () => ({ data: membershipPlans }));

app.setNotFoundHandler((request, reply) => reply.code(404).send({
  error: { code: 'NOT_FOUND', message: `Route ${request.method} ${request.url} not found` }
}));

try {
  await app.listen({ port, host });
} catch (error) {
  app.log.error(error);
  process.exit(1);
}
