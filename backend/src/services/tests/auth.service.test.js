const { getUserWithPassword, getUserWithPasswordToken } = require('../auth.service');

const User = require('../../models/user');
jest.mock('../../models/user')

describe('Auth service', () => {

  const select = jest.fn();
  User.findOne = jest.fn().mockImplementation(() => ({
    select,
  }));

  const params = {
    email: 'email@mail.com',
  };

  describe('getUserWithPassword', () => {
    it('should call User.findOne and select with correct params', () => {
      getUserWithPassword(params);

      expect(User.findOne).toHaveBeenCalledWith(params);
      expect(select).toHaveBeenCalledWith('+password');
    });
  });

  describe('getUserWithPasswordToken', () => {
    it('should call User.findOne and select with correct params', () => {
      getUserWithPasswordToken(params);


      expect(User.findOne).toHaveBeenCalledWith(params);
      expect(select).toHaveBeenCalledWith([
        'password',
        'passwordToken',
        'passwordTokenExp',
      ]);
    });
  });
});
