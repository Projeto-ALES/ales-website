const {
  getUsers,
  createUser,
  getUser,
  deleteUser,
  updateUser,
} = require("../user.service");

const User = require("../../models/user");
jest.mock("../../models/user");

describe("User service", () => {
  User.find = jest.fn();
  User.create = jest.fn();
  User.findById = jest.fn();
  User.findByIdAndDelete = jest.fn();
  User.updateOne = jest.fn();

  const params = {
    id: "test_id",
    data: {
      name: "Test Name",
      email: "test@mail.com",
    },
  };

  describe("getUsers", () => {
    it("should call User.find with correct params", () => {
      getUsers(params.data);
      expect(User.find).toHaveBeenCalledWith(params.data);
      expect(User.find).toHaveBeenCalledTimes(1);
    });
  });

  describe("createUser", () => {
    it("should call User.create with correct params", () => {
      createUser(params.data);
      expect(User.create).toHaveBeenCalledWith(params.data);
      expect(User.create).toHaveBeenCalledTimes(1);
    });
  });

  describe("getUser", () => {
    it("should call User.findById with correct params", () => {
      getUser(params.id);
      expect(User.findById).toHaveBeenCalledWith(params.id);
      expect(User.findById).toHaveBeenCalledTimes(1);
    });
  });

  describe("deleteUser", () => {
    it("should call User.findByIdAndDelete with correct params", () => {
      deleteUser(params.id);
      expect(User.findByIdAndDelete).toHaveBeenCalledWith(params.id);
      expect(User.findByIdAndDelete).toHaveBeenCalledTimes(1);
    });
  });

  describe("updateUser", () => {
    it("should call User.updateOne with correct params", () => {
      updateUser(params.id, params.data);
      expect(User.updateOne).toHaveBeenCalledWith(
        { _id: params.id },
        { $set: params.data }
      );
      expect(User.updateOne).toHaveBeenCalledTimes(1);
    });
  });
});
