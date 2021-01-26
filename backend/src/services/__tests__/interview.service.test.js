const sinon = require('sinon');

const InterviewService = require('../interview.service');
const Interview = require('../../models/interview');

describe('InterviewService test', () => {
  it('has a module', () => {
    expect(InterviewService).toBeDefined();
  });

  describe('getInterviewById test', () => {
    it('calls Interview.findById once', async () => {
      const findById = sinon.stub(Interview, 'findById');
      const id = 'id';
      await InterviewService.getInterviewById(id);
      expect(findById.withArgs(id).callCount).toEqual(1);
    });
  });

  describe('createInterview test', () => {
    it('calls Interview.create once', async () => {
      const create = sinon.stub(Interview, 'create');
      const body = { start: Date.now(), end: Date.now() };
      await InterviewService.createInterview(body);
      expect(create.withArgs(body).callCount).toEqual(1);
    });
  });

  describe('deleteInterview test', () => {
    it('calls Interview.findByIdAndDelete once', async () => {
      const findByIdAndDelete = sinon.stub(Interview, 'findByIdAndDelete');
      const id = "id";
      await InterviewService.deleteInterview(id);
      expect(findByIdAndDelete.withArgs(id).callCount).toEqual(1);
    });
  });

  describe('updateInterview test', () => {
    it('calls Interview.findOneAndUpdate once', async () => {
      const findOneAndUpdate = sinon.stub(Interview, 'findOneAndUpdate');
      const id = "id";
      const body = { status: "pending" };
      await InterviewService.updateInterview(id, body);
      expect(findOneAndUpdate.withArgs({ _id: id }, { $set: { ...body } }).callCount).toEqual(1);
    });
  });

  describe('createManyInterviews test', () => {
    it('calls Interview.insertMany once', async () => {
      const insertMany = sinon.stub(Interview, 'insertMany');
      const interviews = [
        { start: Date.now(), end: Date.now() },
        { start: Date.now(), end: Date.now() },
        { start: Date.now(), end: Date.now() },
      ]
      await InterviewService.createManyInterviews(interviews);
      expect(insertMany.withArgs(interviews).callCount).toEqual(1);
    });
  });
});
