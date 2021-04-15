import request from 'supertest';
import EXPRESS_TEST_APP from '../../__test__/test_app';

describe('Test like interaction', () => {
  it('Likes stuff', async () => {
    const response = await request(EXPRESS_TEST_APP)
      .post('/user/myuserid/photo/myphotoid/interaction/like').send();
    // console.log(response);
    expect(response).toBeTruthy();
  });
});
