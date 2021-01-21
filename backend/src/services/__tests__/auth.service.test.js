const sinon = require('sinon');

const AuthService = require('../auth.service');
const User = require('../../models/user');

describe('AuthService test', () => {
  it('has a module', () => {
    expect(AuthService).toBeDefined();
  });

  describe('getUserWithPassword test', () => {
    it('calls User.findOne once', async () => {
      const mockFindOne = {
        select() {
          return this;
        },
      };
      const findOne = sinon.stub(User, 'findOne').returns(mockFindOne);
      const id = 'id';
      await AuthService.getUserWithPassword({ _id: id });
      expect(findOne.withArgs({ _id: id }).callCount).toEqual(1);
      findOne.restore();
    });
  });

  describe('getUserWithPasswordToken test', () => {
    it('calls User.findOne once', async () => {
      const mockFindOne = {
        select() {
          return this;
        },
      };
      const findOne = sinon.stub(User, 'findOne').returns(mockFindOne);
      const id = 'id';
      await AuthService.getUserWithPasswordToken({ _id: id });
      expect(findOne.withArgs({ _id: id }).callCount).toEqual(1);
    });
  });
});
