import { Test, TestingModule } from '@nestjs/testing';
import { SurveyResponseService } from './survey_response.service';
import { SurveyResponse } from './survey_response.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('SurveyResponseService', () => {
  let service: SurveyResponseService;
  let repository: MockRepository<SurveyResponse>;

  const mockRepository = () => ({
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  });

  type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide:  getRepositoryToken(SurveyResponse),
          useValue: mockRepository(),
        },
        SurveyResponseService,
      ],
    }).compile();

    service = module.get<SurveyResponseService>(SurveyResponseService);
    repository = module.get<MockRepository<SurveyResponse>>(
      getRepositoryToken(SurveyResponse),
    );
  });

  beforeEach(() => {
    jest.clearAllMocks(); // mock 함수의 호출 횟수 초기화
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Create', () => {
    const createArgs = {
      surveyId: 1,
      userId: 1,
      completionDate: new Date(),
    };

    it('Fail: CreateSurveyResponse', async () => {
      repository.save.mockRejectedValue(new Error('save error'));
      expect(service.createSurveyResponse(createArgs)).rejects.toThrow('Unexpected error: save error');
    });

    it('Pass: CreateSurveyResponse', async () => {
      repository.save.mockResolvedValue(createArgs);
      const result = await service.createSurveyResponse(createArgs);

      expect(repository.create).toHaveBeenCalledTimes(1);
      expect(repository.create).toHaveBeenCalledWith(createArgs);
      expect(repository.save).toHaveBeenCalledTimes(1);

      expect(result).toEqual(createArgs);
    });
  });

  describe('Read', () => {
    const readArgs: number = 1;
    const readResult = {
      id: 1,
      surveyId: 1,
      userId: 1,
      completionDate: new Date(),
    }

    it('Fail: GetSurveyResponse', async () => {
      repository.findOne.mockRejectedValue(new Error('findOne error'));
      expect(service.getSurveyResponse(readArgs)).rejects.toThrow('Unexpected error: findOne error');
    });

    it('Fail: GetSurveyResponses', async () => {
      repository.find.mockRejectedValue(new Error('find error'));
      expect(service.getSurveyResponses()).rejects.toThrow('Unexpected error: find error');
    });

    it ('Pass: GetSurveyResponse', async () => {
      repository.findOne.mockResolvedValue(readResult);
      const result = await service.getSurveyResponse(readArgs);

      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: readArgs }});
      expect(repository.findOne).toHaveBeenCalledTimes(1);

      expect(result).toEqual(readResult);
    });

    it ('Pass: GetSurveyResponses', async () => {
      repository.find.mockResolvedValue([readResult]);
      const result = await service.getSurveyResponses();

      expect(repository.find).toHaveBeenCalledTimes(1);

      expect(result).toEqual([readResult]);
    });
  });

  describe('Update', () => {
    const updateArgsId = 1;
    const updateArgs = {
      userId: 2
    };
    const originalResult = {
      id: 1,
      surveyId: 1,
      userId: 1,
      completionDate: new Date(),
    }
    const updateResult = {
      id: 1,
      surveyId: 1,
      userId: 2,
      completionDate: new Date(),
    }

    it('Fail: UpdateSurveyResponse', async () => {
      repository.update.mockRejectedValueOnce(new Error('update error'));
      expect(service.updateSurveyResponse(updateArgsId, updateArgs)).rejects.toThrow('Unexpected error: update error');
    });

    it('Pass: UpdateSurveyResponse', async () => {
      repository.findOne.mockResolvedValue(originalResult);
      const result = await service.updateSurveyResponse(updateArgsId, updateArgs);

      expect(repository.findOne).toHaveBeenCalledTimes(1);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: updateArgsId }});
      expect(repository.update).toHaveBeenCalledTimes(1);
      expect(repository.update).toHaveBeenCalledWith(updateArgsId, updateArgs);

      expect(result).toEqual(updateResult);
    });
  });

  describe('Delete', () => {
    const deleteArgs = 1;
    const deleteResult = {
      affected: 1
    };

    it('Fail: DeleteSurveyResponse', async () => {
      repository.delete.mockRejectedValue(new Error('delete error'));
      expect(service.deleteSurveyResponse(deleteArgs)).rejects.toThrow('Unexpected error: delete error');
    });

    it('Pass: DeleteSurveyResponse', async () => {
      repository.delete.mockResolvedValue(deleteResult);
      const result = await service.deleteSurveyResponse(deleteArgs);

      expect(repository.findOne).toHaveBeenCalledTimes(1);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: deleteArgs }});
      expect(repository.delete).toHaveBeenCalledTimes(1);
      expect(repository.delete).toHaveBeenCalledWith(deleteArgs);

      expect(result).toEqual(deleteResult.affected);
    });
  });
});
