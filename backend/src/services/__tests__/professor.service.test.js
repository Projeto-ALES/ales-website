const sinon = require('sinon');

const ProfessorService = require('../professor.service');
const Professor = require('../../models/professor');

describe('ProfessorService test', () => {
  it('has a module', () => {
    expect(ProfessorService).toBeDefined();
  });

  describe('getProfessors test', () => {
    it('calls Professor.find once', async () => {
      const find = sinon.stub(Professor, 'find');
      await ProfessorService.getProfessors({});
      expect(find.withArgs({}).callCount).toEqual(1);
    });
  });

  describe('createProfessor test', () => {
    it('calls Professor.create once', async () => {
      const create = sinon.stub(Professor, 'create');
      const prof = {
        name: 'foo', email: 'foo@mail', password: 'bar', area: 'math',
      };
      await ProfessorService.createProfessor(prof);
      expect(create.withArgs(prof).callCount).toEqual(1);
    });
  });

  describe('getProfessor test', () => {
    it('calls Professor.findById once', async () => {
      const findOne = sinon.stub(Professor, 'findOne');
      const id = 'id';
      await ProfessorService.getProfessor({ _id: id });
      expect(findOne.withArgs({ _id: id }).callCount).toEqual(1);
    });
  });

  describe('deleteProfessor test', () => {
    it('calls Professor.findByIdAndDelete once', async () => {
      const findByIdAndDelete = sinon.stub(Professor, 'findByIdAndDelete');
      const id = 'id';
      await ProfessorService.deleteProfessor(id);
      expect(findByIdAndDelete.withArgs(id).callCount).toEqual(1);
    });
  });

  describe('updateProfessor test', () => {
    it('calls Professor.findOneAndUpdate once', async () => {
      const findOneAndUpdate = sinon.stub(Professor, 'findOneAndUpdate');
      const id = 'id';
      const data = { name: 'foo' };
      await ProfessorService.updateProfessor(id, data);
      expect(findOneAndUpdate.withArgs({ _id: id }, { $set: data }).callCount).toEqual(1);
    });
  });
});
