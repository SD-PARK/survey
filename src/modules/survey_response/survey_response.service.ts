import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SurveyResponse } from './survey_response.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateSurveyResponseInput, UpdateSurveyResponseInput } from './survey_response.input';

@Injectable()
export class SurveyResponseService {
    constructor(
        @InjectRepository(SurveyResponse) private readonly surveyResponseRepository: Repository<SurveyResponse>,
    ) {}
    private readonly logger: Logger = new Logger(SurveyResponseService.name);

    // Create
    async createSurveyResponse(surveyResponseInput: CreateSurveyResponseInput): Promise<SurveyResponse> {
        try {
            const newSurveyResponse: SurveyResponse = this.surveyResponseRepository.create(surveyResponseInput);
            return await this.surveyResponseRepository.save(newSurveyResponse);
        } catch (err) {
            throw new Error(`Unexpected error: ${err.message}`);
        }
    }
    
    // Read
    async getSurveyResponse(id: number): Promise<SurveyResponse> {
        let result: SurveyResponse;
        try {
            result = await this.surveyResponseRepository.findOne({ where: { id: id }});
            
            if (result === null)
                throw new NotFoundException(`ID: ${id}에 해당하는 항목을 찾을 수 없습니다.`);
            else
                return result;
        } catch (err) {
            throw new Error(`Unexpected error: ${err.message}`);
        }
    }

    async getSurveyResponses(): Promise<SurveyResponse[]> {
        try {
            const result: SurveyResponse[] = await this.surveyResponseRepository.find();
            return result;
        } catch (err) {
            throw new Error(`Unexpected error: ${err.message}`);
        }
    }

    // Update
    async updateSurveyResponse(id: number, surveyResponseInput: UpdateSurveyResponseInput): Promise<SurveyResponse> {
        const surveyResponse: SurveyResponse = await this.getSurveyResponse(id);
        try {
            await this.surveyResponseRepository.update(id, surveyResponseInput);
            const updateSurveyResponse = { ...surveyResponse, ...surveyResponseInput };
            return updateSurveyResponse;
        } catch (err) {
            throw new Error(`Unexpected error: ${err.message}`);
        }
    }

    // Delete
    async deleteSurveyResponse(id: number): Promise<number> {
        await this.getSurveyResponse(id);
        try {
            const result: DeleteResult = await this.surveyResponseRepository.delete(id);
            return result.affected;
        } catch (err) {
            throw new Error(`Unexpected error: ${err.message}`);
        }
    }
}