import {
  generateUser,
} from '../../../../helpers/api-integration/v3';

describe('POST /user/sleep', () => {
  let user;

  beforeEach(async () => {
    user = await generateUser();
  });

  it('toggles sleep status', async () => {
    let res = await user.post(`/user/sleep`);
    expect(res).to.eql({
      preferences: {sleep: true},
    });
    await user.sync();
    expect(user.preferences.sleep).to.be.true;

    let res2 = await user.post(`/user/sleep`);
    expect(res2).to.eql({
      preferences: {sleep: false},
    });
    await user.sync();
    expect(user.preferences.sleep).to.be.false;
  });
});
