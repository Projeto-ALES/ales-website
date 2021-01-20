const mongoose = require("mongoose");
const connect = require("../../mongo");
const User = require("../user");

connect("user_model_test");

describe("User model test", () => {
  beforeAll(async () => {
    await User.deleteMany({});
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("has a module", () => {
    expect(User).toBeDefined();
  });

  describe("list users", () => {
    it("list all users", async () => {
      await User.create({ name: "foo1", email: "foo1@mail", password: "bar" });
      await User.create({ name: "foo2", email: "foo2@mail", password: "bar" });
      await User.create({ name: "foo3", email: "foo3@mail", password: "bar" });

      const users = await User.find({});
      expect(users.length).toEqual(3);
    });
  });

  describe("get user", () => {
    it("gets a user", async () => {
      await User.create({ name: "foo", email: "foo@mail", password: "bar" });

      const foundUser = await User.findOne({ name: "foo" });
      expect(foundUser.name).toEqual("foo");
    });
  });

  describe("save user", () => {
    it("saves a user", async () => {
      const savedUser = await User.create({ name: "foo", email: "foo@mail", password: "bar" });
      expect(savedUser.name).toEqual("foo");
    });
  });

  describe("update user", () => {
    it("updates a user", async () => {
      const user = await User.create({ name: "foo", email: "foo@mail", password: "bar" });
      user.name = "bar";
      const updatedUser = await user.save();
      expect(updatedUser.name).toEqual("bar");
    });
  });

  describe("delete user", () => {
    it("deletes a user", async () => {
      const user = await User.create({ name: "foo", email: "foo@mail", password: "bar" });
      await User.findOneAndDelete({ name: user.name });
      const deletedUser = await User.findOne({ name: user.name });
      expect(deletedUser).toEqual(null);
    });
  });
});