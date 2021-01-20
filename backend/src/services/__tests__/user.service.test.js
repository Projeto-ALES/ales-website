const sinon = require('sinon');

const UserService = require('../user.service');
const User = require('../../models/user');

describe('UserService test', () => {
  it('has a module', () => {
    expect(UserService).toBeDefined();
  });

  describe('getUsers test', () => {
    it('calls User.find once', async () => {
      const find = sinon.stub(User, 'find');
      await UserService.getUsers({});
      expect(find.withArgs({}).callCount).toEqual(1);
    });
  });

  describe('createUser test', () => {
    it('calls User.create once', async () => {
      const create = sinon.stub(User, 'create');
      const user = { name: 'foo', email: 'foo@mail', password: 'bar' };
      await UserService.createUser(user);
      expect(create.withArgs(user).callCount).toEqual(1);
    });
  });

  describe('getUser test', () => {
    it('calls User.findById once', async () => {
      const findById = sinon.stub(User, 'findById');
      const id = 'id';
      await UserService.getUser(id);
      expect(findById.withArgs(id).callCount).toEqual(1);
    });
  });

  describe('deleteUser test', () => {
    it('calls User.findByIdAndDelete once', async () => {
      const findByIdAndDelete = sinon.stub(User, 'findByIdAndDelete');
      const id = 'id';
      await UserService.deleteUser(id);
      expect(findByIdAndDelete.withArgs(id).callCount).toEqual(1);
    });
  });

  describe('updateUser test', () => {
    it('calls User.updateOne once', async () => {
      const updateOne = sinon.stub(User, 'updateOne');
      const id = 'id';
      const data = { name: 'foo' };
      await UserService.updateUser(id, data);
      expect(updateOne.withArgs({ _id: id }, { $set: data }).callCount).toEqual(1);
    });
  });
});
