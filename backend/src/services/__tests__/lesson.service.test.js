const sinon = require('sinon');

const LessonService = require('../lesson.service');
const Lesson = require('../../models/lesson');

describe('LessonService test', () => {
  it('has a module', () => {
    expect(LessonService).toBeDefined();
  });

  describe('getLessonsByCourseId test', () => {
    it('calls Lesson.find once', async () => {
      const mockFind = {
        populate() {
          return this;
        },
      };
      const find = sinon.stub(Lesson, 'find').returns(mockFind);
      const id = 'id';
      await LessonService.getLessonsByCourseId(id);
      expect(find.withArgs({ course: id }).callCount).toEqual(1);
    });
  });

  describe('getLessonById test', () => {
    it('calls Lesson.findById once', async () => {
      const mockFindById = {
        populate() {
          return this;
        },
      };
      const findById = sinon.stub(Lesson, 'findById').returns(mockFindById);
      const id = 'id';
      await LessonService.getLessonById(id);
      expect(findById.withArgs(id).callCount).toEqual(1);
    });
  });

  describe('createLesson test', () => {
    it('calls Lesson.create once', async () => {
      const create = sinon.stub(Lesson, 'create');
      const lesson = { title: 'lesson 1', description: 'introductory' };
      await LessonService.createLesson(lesson);
      expect(create.withArgs(lesson).callCount).toEqual(1);
    });
  });

  describe('deleteLesson test', () => {
    it('calls Lesson.findByIdAndDelete once', async () => {
      const findByIdAndDelete = sinon.stub(Lesson, 'findByIdAndDelete');
      const id = 'id';
      await LessonService.deleteLesson(id);
      expect(findByIdAndDelete.withArgs(id).callCount).toEqual(1);
    });
  });

  describe('updateLesson test', () => {
    it('calls Lesson.findOneAndUpdate once', async () => {
      const findOneAndUpdate = sinon.stub(Lesson, 'findOneAndUpdate');
      const id = 'id';
      const data = { description: 'closing class' };
      await LessonService.updateLesson(id, data);
      expect(findOneAndUpdate.withArgs({ _id: id }, { $set: data }).callCount).toEqual(1);
    });
  });
});
