import { Injectable } from '@angular/core';

import {
    QuestionModel
} from "./question.model"

import {
    Answer,
    API_Question,
    Difficulty,
    Scores
} from "../models/interface"

import { EASY_POINTS, MEDIUM_POINTS, HARD_POINTS } from '../utils';



@Injectable({ providedIn: 'root' })
export class QuizService {

    questions: QuestionModel[] = [];
    currentIndex: number = -1;
    userScore: Scores;

    constructor() {
        this.userScore = this.resetScores();
    }

    newGame(api_questions: API_Question[]) {
        this.resetQuiz();
        this.questions = this.processQuestions(api_questions);
        this.currentIndex = 0;
    }

    resetQuiz() {
        this.questions = [];
        this.userScore = this.resetScores();
    }

    repeatGame() {
        this.userScore = this.repeatScores();
        this.currentIndex = 0;
    }

    isLastQuestion(): boolean {
        return ((this.currentIndex + 1) === this.userScore.totalQuestions);
    }

    nextQuestion() {
        this.currentIndex += 1;
    }

    checkUserAnswer(selected: number) {
        const questionModel = this.getQuestionModel(this.currentIndex);

        if (questionModel.userSelectCorrectAnswer(selected)) {
            this.correctAnswer();
        } else {
            this.wrongAnswer();
        }
    }

    getQuestionText(): string {
        const questionModel = this.getQuestionModel(this.currentIndex);
        return questionModel.getQuestion();
    }

    getAnswers(): Answer[] {
        const questionModel = this.getQuestionModel(this.currentIndex);
        return questionModel.getAnswers();
    }

    getQuestionCategory(): string {
        const questionModel = this.getQuestionModel(this.currentIndex);
        return questionModel.getCategory();
    }

    getQuestionDifficulty(): Difficulty {
        const questionModel = this.getQuestionModel(this.currentIndex);
        return questionModel.getDifficulty();
    }

    getCurrentQuestion(): number {
        return this.currentIndex + 1;
    }

    getTotalQuestions(): number {
        return this.userScore.totalQuestions;
    }

    getCurrentPoints(): number {
        return this.userScore.userPoints;
    }

    getTotalPoints(): number {
        return this.userScore.totalPoints;
    }

    getScores(): Scores {
        return this.userScore;
    }

    private processQuestions(api_questions: API_Question[]): QuestionModel[] {

        const questions: QuestionModel[] = [];

        api_questions.forEach((value: API_Question) => {

            const quesModel = new QuestionModel(value);

            this.userScore.totalPoints += quesModel.getPoints();
            this.userScore.totalQuestions++;

            questions.push(quesModel);
        });

        return questions;
    }

    public getQuestionModel(index: number): QuestionModel {
        return this.questions[index];
    }

    public correctAnswer() {
        this.updateScore(this.getQuestionDifficulty());
        this.userScore.succesAnswers += 1;
    }
    public wrongAnswer() { }


    private updateScore(difficulty: Difficulty) {

        switch (difficulty) {
            case Difficulty.Easy:
                this.userScore.userPoints += EASY_POINTS; return;
            case Difficulty.Medium:
                this.userScore.userPoints += MEDIUM_POINTS; return;
            case Difficulty.Hard:
                this.userScore.userPoints += HARD_POINTS; return;

            default:
                return;
        }

    }

    private repeatScores(): Scores {

        const repeatScores: Scores = {
            totalQuestions: this.userScore.totalQuestions,
            succesAnswers: 0,
            totalPoints: this.userScore.totalPoints,
            userPoints: 0
        }

        return repeatScores;
    }

    private resetScores(): Scores {

        const newScores: Scores = {
            totalQuestions: 0,
            succesAnswers: 0,
            totalPoints: 0,
            userPoints: 0
        }

        return newScores;
    }
}