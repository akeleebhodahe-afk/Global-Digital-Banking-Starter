import test from 'node:test';
import assert from 'node:assert/strict';
import { buildApp } from '../src/app.js';

test('health endpoint reports status and a request id', async (t) => {
  const app = buildApp();
  t.after(() => app.close());
  const response = await app.inject({ method: 'GET', url: '/api/health', headers: { 'x-request-id': 'test-health-1' } });
  assert.equal(response.statusCode, 200);
  assert.deepEqual(response.json(), { status: 'ok', service: 'globalbank-api', version: '0.1.0', requestId: 'test-health-1' });
  assert.equal(response.headers['x-request-id'], 'test-health-1');
});

test('content endpoints return collections with counts', async (t) => {
  const app = buildApp();
  t.after(() => app.close());
  const [knowledge, resources, plans] = await Promise.all([
    app.inject('/api/knowledge'), app.inject('/api/resources'), app.inject('/api/membership/plans')
  ]);
  for (const response of [knowledge, resources, plans]) {
    assert.equal(response.statusCode, 200);
    assert.ok(response.json().data.length > 0);
    assert.equal(response.json().meta.count, response.json().data.length);
  }
});

test('invalid slugs return a validation error', async (t) => {
  const app = buildApp();
  t.after(() => app.close());
  const response = await app.inject('/api/knowledge/Not_A_Valid_Slug');
  assert.equal(response.statusCode, 400);
  assert.equal(response.json().error.code, 'VALIDATION_ERROR');
  assert.ok(response.json().error.requestId);
});

test('unknown articles and routes use the documented error envelope', async (t) => {
  const app = buildApp();
  t.after(() => app.close());
  const article = await app.inject('/api/knowledge/not-a-real-article');
  const route = await app.inject('/api/not-a-route');
  assert.equal(article.statusCode, 404);
  assert.equal(article.json().error.code, 'NOT_FOUND');
  assert.ok(article.json().error.requestId);
  assert.equal(route.statusCode, 404);
  assert.equal(route.json().error.code, 'NOT_FOUND');
  assert.ok(route.json().error.requestId);
});
