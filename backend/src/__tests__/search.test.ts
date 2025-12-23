import request from 'supertest';
import { app } from '../app';
import fetch from 'node-fetch';

jest.mock('node-fetch'); // mock fetch pro testy
const { Response } = jest.requireActual('node-fetch');

describe('POST /search', () => {
  it('should return 400 if query is missing', async () => {
    const res = await request(app).post('/search').send({});
    expect(res.status).toBe(400);
  });

  it('should return mocked results', async () => {
    // fetch vrátí mockovaná data, nevolá skutečné API
    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue(
      new Response(JSON.stringify({
        items: [
          { title: 'Result 1' },
          { title: 'Result 2' },
          { title: 'Result 3' },
        ]
      }))
    );

    const res = await request(app).post('/search').send({ query: 'typescript' });
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(3);
  });
});
