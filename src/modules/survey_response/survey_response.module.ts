import { Module } from '@nestjs/common';
import { SurveyResponseService } from './survey_response.service';
import { SurveyResponseResolver } from './survey_response.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveyResponse } from './survey_response.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SurveyResponse])],
  providers: [SurveyResponseService, SurveyResponseResolver]
})
export class SurveyResponseModule {}
