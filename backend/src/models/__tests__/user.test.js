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

  describe("user not found", () => {
    it("gets a non existent user", async () => {
      const user = await User.findOne({ name: "foo" });
      expect(user).toEqual(null);
    });
  });

  describe("save user", () => {
    it("saves a user", async () => {
      const savedUser = await User.create({ name: "foo", email: "foo@mail", password: "bar" });
      expect(savedUser.name).toEqual("foo");
      expect(savedUser.email).toEqual("foo@mail");
    });
  });

  describe("fields validation", () => {
    it("saves a user with valid fields", async () => {
      const savedUser = await User.create({ name: "foo", email: "foo@mail", password: "bar" });
      expect(savedUser._id).toBeDefined();
      expect(savedUser.name).toBeDefined();
      expect(savedUser.email).toBeDefined();
      expect(savedUser.password).toBeDefined();
    });
  });

  describe("invalid fields", () => {
    it("saves a user with a invalid field", async () => {
      const savedUser = await User.create({ name: "foo", email: "foo@mail", password: "bar", username: "_foo_" });
      expect(savedUser._id).toBeDefined();
      expect(savedUser.username).toBeUndefined();
    });
  });

  describe("required field missing", () => {
    it("tries to save a user without a required field", async () => {
      let error;
      try {
        await User.create({ name: "foo" });
      } catch (e) {
        error = e;
      }
      expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
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

  describe("try to update a user", () => {
    it("updates a non existent user", async () => {
      const user = await User.create({ name: "foo", email: "foo@mail", password: "bar" });
      await User.deleteOne({ _id: user._id });
      let error;
      try {
        user.name = "bar";
        await user.save();
      } catch (e) {
        error = e;
      }
      expect(error).toBeInstanceOf(mongoose.Error.DocumentNotFoundError);
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