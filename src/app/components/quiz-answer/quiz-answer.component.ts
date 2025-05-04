import { Component, ElementRef, EventEmitter, input, OnChanges, Output, signal, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  Answer,
  AnswerState
} from "../../models"


@Component({
  selector: 'quiz-answer',
  imports: [CommonModule],
  templateUrl: './quiz-answer.component.html',
})
export class QuizAnswerComponent implements OnChanges {

  @ViewChild('answerDiv', { static: false }) answerDivRef!: ElementRef;

  allowClick = input.required<boolean>();
  answer = input.required<Answer>();
  answerState = signal<AnswerState>(AnswerState.NO_CLICKED);

  @Output()
  outAnswerState = new EventEmitter<AnswerState>();
  
  constructor(private elementRef: ElementRef) { }
  
  ngOnChanges(changes: SimpleChanges): void {
    if( this.allowClick() ){
      this.resetClassNames();
    }
  }

  get statusClass(): string {
    return this.getStatusClass();
  }


  getAnswerText() {
    return this.answer().text;
  }

  checkAnswer() {

    if (this.allowClick() === false) return;

    if (this.answer().isCorrect) {

      this.answerState.set(AnswerState.CORRECT);

    } else {
      this.answerState.set(AnswerState.INCORRECT);
    }

    this.outAnswerState.emit(this.answerState());

  }

  resetClassNames() {
    const div = this.answerDivRef?.nativeElement as HTMLElement;
    if (div) {
      div.setAttribute('class', 'answer-default');
    }
  }

  getStatusClass(): string {

    switch (this.answerState()) {

      case AnswerState.NO_CLICKED:
        return 'answer-default';

      case AnswerState.CORRECT:
        return 'answer-correct';

      case AnswerState.INCORRECT:
        return 'answer-incorrect';

      default:
        return 'answer-default';
    }
  }
}
