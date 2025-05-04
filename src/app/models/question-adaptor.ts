import {
    Question,
    API_Question,
    Answer,
    Difficulty
} from "./interface"

import { shuffleInPlace } from "../utils"

export class QuestionAdaptor {

    static applyAdaptor(api_question: API_Question): Question {

        const question: Question = {
            difficulty: api_question.difficulty,
            type: api_question.type,
            category: api_question.category,
            points: QuestionAdaptor.getAnswerPoints(api_question.difficulty),
            question: api_question.question,
            answers: QuestionAdaptor.apiAnswer2QuizAnswer(api_question.incorrect_answers, api_question.correct_answer)
        };

        return question;
    }

    static apiAnswer2QuizAnswer(invalid_answers: string[], valid_answer: string): Answer[] {

        const answers: Answer[] = [];

        // Inserting Valid Answer
        answers.push(
            {
                text: valid_answer,
                isSelected: false,
                isCorrect: true,
            }
        )

        // Inserting Invalid Answers
        invalid_answers.forEach((value, index) => {
            answers.push({
                text: value,
                isSelected: false,
                isCorrect: false,
            });
        })

        // Shuffle Answers
        shuffleInPlace<Answer>(answers);


        return answers;
    }

    static getAnswerPoints(difficulty: Difficulty) {

        switch (difficulty) {

            case Difficulty.Easy:
                return 10;
            case Difficulty.Medium:
                return 20;
            case Difficulty.Hard:
                return 30;

            default:
                return 0;
        }
    }

}