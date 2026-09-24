import test from 'node:test';
import assert from 'node:assert/strict';
import { buildApp } from '../src/app.js';

test('health endpoint reports the API status', async (t) => {
  const app = buildApp();
  t.after(() => app.close());
  const response = await app.inject({ method: 'GET', url: '/api/health' });
  assert.equal(response.statusCode, 200);
  assert.deepEqual(response.json(), { status: 'ok', service: 'globalbank-api', version: '0.1.0' });
});

test('content endpoints are read-only and return public data', async (t) => {
  const app = buildApp();
  t.after(() => app.close());
  const [knowledge, resources, plans] = await Promise.all([
    app.inject('/api/knowledge'),
    app.inject('/api/resources'),
    app.inject('/api/membership/plans')
  ]);
  assert.equal(knowledge.statusCode, 200);
  assert.ok(knowledge.json().data.length > 0);
  assert.equal(resources.statusCode, 200);
  assert.ok(resources.json().data.length > 0);
  assert.equal(plans.statusCode, 200);
  assert.ok(plans.json().data.length > 0);
});

test('unknown articles and routes use the documented error envelope', async (t) => {
  const app = buildApp();
  t.after(() => app.close());
  const article = await app.inject('/api/knowledge/not-a-real-article');
  const route = await app.inject('/api/not-a-route');
  assert.equal(article.statusCode, 404);
  assert.deepEqual(article.json().error.code, 'NOT_FOUND');
  assert.equal(route.statusCode, 404);
  assert.deepEqual(route.json().error.code, 'NOT_FOUND');
});
