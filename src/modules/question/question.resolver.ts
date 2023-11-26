import { Query, Mutation, Resolver, Args } from '@nestjs/graphql';
import { Question } from './question.entity';
import { QuestionService } from './question.service';
import { CreateQuestionInput, UpdateQuestionInput } from './question.input';

@Resolver()
export class QuestionResolver {
    constructor(private readonly questionService: QuestionService) {}
    // Create
    @Mutation(() => Question)
    async createQuestion(@Args('QuestionInput') QuestionInput: CreateQuestionInput): Promise<Question> {
        return this.questionService.createQuestion(QuestionInput);
    }
    
    // Read
    @Query(() => Question)
    async getQuestion(@Args('id') id: number): Promise<Question> {
        return this.questionService.getQuestion(id);
    }
    
    @Query(() => [Question])
    async getQuestions(): Promise<Question[]> {
        return this.questionService.getQuestions();
    }

    // Update
    @Mutation(() => Question)
    async updateQuestion(
        @Args('id') id: number,
        @Args('QuestionInput') QuestionInput: UpdateQuestionInput
    ): Promise<Question> {
        return this.questionService.updateQuestion(id, QuestionInput);
    }

    // Delete
    @Mutation(() => Number)
    async deleteQuestion(@Args('id') id: number): Promise<number> {
        return this.questionService.deleteQuestion(id);
    }
}
