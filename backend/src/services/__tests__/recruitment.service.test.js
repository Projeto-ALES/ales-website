const sinon = require('sinon');

const RecruitmentService = require('../recruitment.service');
const Recruitment = require('../../models/recruitment');

describe('RecruitmentService test', () => {
  it('has a module', () => {
    expect(RecruitmentService).toBeDefined();
  });

  describe('getProcesses test', () => {
    it('calls Recruitment.find once', async () => {
      const find = sinon.stub(Recruitment, 'find');
      await RecruitmentService.getProcesses({});
      expect(find.withArgs({}).callCount).toEqual(1);
    });
  });

  describe('createProcess test', () => {
    it('calls Recruitment.create once', async () => {
      const create = sinon.stub(Recruitment, 'create');
      const process = { name: '1S2020', beginningDate: Date.now(), endDate: Date.now(), calendarId: "foo" };
      await RecruitmentService.createProcess(process);
      expect(create.withArgs(process).callCount).toEqual(1);
    });
  });

  describe('getProcessByName test', () => {
    it('calls Recruitment.findOne once', async () => {
      const findOne = sinon.stub(Recruitment, 'findOne');
      const name = '1S2020';
      await RecruitmentService.getProcessByName(name);
      expect(findOne.withArgs({ name }).callCount).toEqual(1);
    });
  });

  describe('deleteProcessByName test', () => {
    it('calls Recruitment.findOneAndDelete once', async () => {
      const findOneAndDelete = sinon.stub(Recruitment, 'findOneAndDelete');
      const name = '1S2020';
      await RecruitmentService.deleteProcessByName(name);
      expect(findOneAndDelete.withArgs({ name }).callCount).toEqual(1);
    });
  });

  describe('updateProcess test', () => {
    it('calls Recruitment.findOneAndUpdate once', async () => {
      const findOneAndUpdate = sinon.stub(Recruitment, 'findOneAndUpdate');
      const name = '1S2020';
      const data = { description: 'recruitment process' };
      await RecruitmentService.updateProcess(name, data);
      expect(findOneAndUpdate.withArgs({ name }, { $set: data }).callCount).toEqual(1);
      findOneAndUpdate.restore();
    });
  });

  describe('addInterviews test', () => {
    it('calls Recruitment.findOneAndUpdate once', async () => {
      const findOneAndUpdate = sinon.stub(Recruitment, 'findOneAndUpdate');
      const name = "1S2021";
      const interviews = [
        { start: Date.now(), end: Date.now() },
        { start: Date.now(), end: Date.now() },
        { start: Date.now(), end: Date.now() },
      ];
      await RecruitmentService.addInterviews(name, interviews);
      expect(findOneAndUpdate.withArgs(
        { name },
        { $push: { interviews: { $each: interviews } } },
        { new: true, useFindAndModify: false }
      ).callCount).toEqual(1);
    });
  });
});
