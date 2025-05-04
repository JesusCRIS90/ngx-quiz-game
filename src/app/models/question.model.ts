import {
    Question,
    API_Question,
    Type as QuestionType,
    Answer,
    Difficulty
} from "./interface"

import { QuestionAdaptor } from "./question-adaptor"

export class QuestionModel {

    private model: Question;

    constructor(question: API_Question) {
        this.model = QuestionAdaptor.applyAdaptor(question);
    }

    userSelectCorrectAnswer( selected: number ): boolean {
        if( !this.IsSelectedValid( selected ) ){
            throw new Error( 'Invalid Index for Question' );
        }
        
        if( this.model.answers[selected].isCorrect === true ){
            return true;
        }
        return false;
    }

    getQuestion(): string {
        return this.model.question;
    }

    getPlainAnswers(): string[] {
        
        const answers: string[] = [];
        
        this.model.answers.forEach( (value) => {
            answers.push( value.text );
        })
    
        return answers;
    }

    getAnswers(): Answer[]{
        return this.model.answers;
    }

    getCategory(): string{
        return this.model.category;
    }

    getDifficulty(): Difficulty{
        return this.model.difficulty;
    }

    getPoints(): number {
        return this.model.points;
    }

    private IsSelectedValid( selected: number ): boolean{
        
        if( this.model.type === QuestionType.Boolean ){
            return selected > 1 ? false : true;
        } else {
            return selected > 3 ? false : true;
        }
    }
}


