import { Component, computed, QueryList, signal, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';

import {
  VerticalLayoutComponent as FlexVert,
  HorizontalLayoutComponent as FlexHori,
  PairLayoutComponent as PairLayout,
  PAIR_DISTRIBUTION as PAIR_POLICY
} from "@beexy/ngx-layouts"

import {
  ImageComponent as Image
} from "@beexy/ngx-components"

import { TimerComponent, TIMER_STATE, QuizAnswerComponent } from "../../components"

import {
  Answer,
  AnswerState,
  QuizService
} from "../../models"
import { getTotalTime, TIME_PER_QUESTION } from '../../utils';

@Component({
  selector: 'main-quiz-page',
  imports: [TimerComponent, FlexVert, FlexHori, PairLayout, Image, QuizAnswerComponent],
  templateUrl: './main-quiz-page.component.html',
})
export default class MainQuizPageComponent {
  
  @ViewChildren('quizAnswer') quizAnswerComponents!: QueryList<QuizAnswerComponent>;
  
  TIMER_STATE = TIMER_STATE;
  PAIR_POLICY = PAIR_POLICY;

  allowAnswer = signal<boolean>(true);
  allowNextQuestion = signal<boolean>(false);

  timerState = signal<TIMER_STATE>(TIMER_STATE.STOP);
  
  updateTimerState = computed( () => { return this.timerState() } );

  constructor(
    private router: Router,
    private quizService: QuizService) {}


  userAnswer( ansState: AnswerState ){
    
    if( ansState === AnswerState.CORRECT ){
      this.quizService.correctAnswer();
    } else {
      this.quizService.wrongAnswer();
    }

    this.allowAnswer.set(false);
    this.allowNextQuestion.set(true);
  }

  nextQuestion(){
    
    if( this.quizService.isLastQuestion() ){
      this.router.navigate(['/results']);
      return;
    }
    
    if( this.allowNextQuestion() === false ) return;


    this.quizService.nextQuestion();

    this.allowAnswer.set(true);
    this.allowNextQuestion.set(false);

    this.resetAllAnswers();
  }

  calculateQuizTime():string{
    return getTotalTime(TIME_PER_QUESTION, this.quizService.getTotalQuestions());
  }

  protected resetAllAnswers(): void {
    this.quizAnswerComponents.forEach((comp) => {
      comp.resetClassNames();
    });
  }

  timerOut(){
    this.router.navigate(['/results']);
  }

  // GETTERS
  getCategory(): string {
    return this.quizService.getQuestionCategory();
  }

  getDifficulty(): string {
    return this.quizService.getQuestionDifficulty();
  }

  getCurrentQuestion(): number {
    return this.quizService.getCurrentQuestion();
  }

  getTotalQuestions(): number {
    return this.quizService.getTotalQuestions();
  }

  getCurrentPoints(): number {
    return this.quizService.getCurrentPoints();
  }

  getTotalPoints(): number {
    return this.quizService.getTotalPoints();
  }

  getQuestion(): string{
    return this.quizService.getQuestionText()
  }

  getAnswers(): Answer[] {
    return this.quizService.getAnswers();
  }

}
