const sinon = require('sinon');

const CourseService = require('../course.service');
const Course = require('../../models/course');

describe('CourseService test', () => {
  it('has a module', () => {
    expect(CourseService).toBeDefined();
  });

  describe('getCourses test', () => {
    it('calls Course.find once', async () => {
      const find = sinon.stub(Course, 'find');
      await CourseService.getCourses({});
      expect(find.withArgs({}).callCount).toEqual(1);
    });
  });

  describe('createCourse test', () => {
    it('calls Course.create once', async () => {
      const create = sinon.stub(Course, 'create');
      const course = { name: 'foo', description: 'very good' };
      await CourseService.createCourse(course);
      expect(create.withArgs(course).callCount).toEqual(1);
    });
  });

  describe('getCourseById test', () => {
    it('calls Course.findById once', async () => {
      const mockFindById = {
        populate() {
          return this;
        },
      };
      const findById = sinon.stub(Course, 'findById').returns(mockFindById);
      const id = 'id';
      await CourseService.getCourseById(id);
      expect(findById.withArgs(id).callCount).toEqual(1);
    });
  });

  describe('deleteCourse test', () => {
    it('calls Course.findByIdAndDelete once', async () => {
      const findByIdAndDelete = sinon.stub(Course, 'findByIdAndDelete');
      const id = 'id';
      await CourseService.deleteCourse(id);
      expect(findByIdAndDelete.withArgs(id).callCount).toEqual(1);
    });
  });

  describe('updateCourse test', () => {
    it('calls Course.findOneAndUpdate once', async () => {
      const findOneAndUpdate = sinon.stub(Course, 'findOneAndUpdate');
      const id = 'id';
      const data = { name: 'foo' };
      await CourseService.updateCourse(id, data);
      expect(findOneAndUpdate.withArgs({ _id: id }, { $set: data }).callCount).toEqual(1);
      findOneAndUpdate.restore();
    });
  });

  describe('addLesson test', () => {
    it('calls Course.findOneAndUpdate once', async () => {
      const findOneAndUpdate = sinon.stub(Course, 'findOneAndUpdate');
      const id = 'id';
      const lesson = { _id: 'lesson_id', title: 'lesson 1', description: 'introductory' };
      await CourseService.addLesson(id, lesson._id);
      expect(findOneAndUpdate.withArgs(
        { _id: id },
        { $push: { lessons: lesson._id } },
        { new: true, useFindAndModify: false },
      ).callCount).toEqual(1);
    });
  });
});
