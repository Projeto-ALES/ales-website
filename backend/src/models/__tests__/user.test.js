const mongoose = require("mongoose");
const connect = require("../../mongo");
const User = require("../user");

describe("User model test", () => {
  beforeAll(async () => {
    connect();
    await User.remove({});
  });

  afterEach(async () => {
    await User.remove({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("has a module", () => {
    expect(User).toBeDefined();
  });

  describe("list users", () => {
    it("list all users", async () => {
      const user1 = new User({ name: "foo1", email: "foo1@mail", password: "bar" });
      await user1.save();
      const user2 = new User({ name: "foo2", email: "foo2@mail", password: "bar" });
      await user2.save();
      const user3 = new User({ name: "foo3", email: "foo3@mail", password: "bar" });
      await user3.save();

      const users = await User.find({});
      expect(users.length).toEqual(3);
    });
  });

  describe("get user", () => {
    it("gets a user", async () => {
      const user = new User({ name: "foo", email: "foo@mail", password: "bar" });
      await user.save();

      const foundUser = await User.findOne({ name: "foo" });
      expect(foundUser.name).toEqual("foo");
    });
  });

  describe("save user", () => {
    it("saves a user", async () => {
      const user = new User({ name: "foo", email: "foo@mail", password: "bar" });
      const savedUser = await user.save();
      expect(savedUser.name).toEqual("foo");
    });
  });

  describe("update user", () => {
    it("updates a user", async () => {
      const user = new User({ name: "foo", email: "foo@mail", password: "bar" });
      await user.save();

      user.name = "bar";
      const updatedUser = await user.save();

      expect(updatedUser.name).toEqual("bar");
    });
  });

  describe("delete user", () => {
    it("deletes a user", async () => {
      const user = new User({ name: "foo", email: "foo@mail", password: "bar" });
      await user.save();

      await User.findOneAndDelete({ name: user.name });
      const deletedUser = await User.findOne({ name: user.name });
      expect(deletedUser).toEqual(null);
    });
  });
});