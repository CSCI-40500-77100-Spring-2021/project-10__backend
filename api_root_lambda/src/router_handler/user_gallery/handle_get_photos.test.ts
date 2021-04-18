import request from 'supertest';
import EXPRESS_TEST_APP from '../../__test__/test_app';

describe('Test like interaction', () => {
  it('Likes stuff', async () => {
    const response = await request(EXPRESS_TEST_APP)
      .get('/user/987d75c6-78cf-467e-8317-336169de92e3/gallery');
    console.log(JSON.stringify(response.body, null, '\t'));
    expect(response).toBeTruthy();
  });
});
