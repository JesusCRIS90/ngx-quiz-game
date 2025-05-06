import { Component, ElementRef, EventEmitter, input, OnChanges, Output, signal, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  Answer,
  AnswerState
} from "../../models"

import { HtmlDecodePipe } from "../../pipes"

@Component({
  selector: 'quiz-answer',
  imports: [CommonModule, HtmlDecodePipe],
  templateUrl: './quiz-answer.component.html',
})
export class QuizAnswerComponent {

  @ViewChild('answerDiv', { static: false }) answerDivRef!: ElementRef;

  allowClick = input.required<boolean>();
  answer = input.required<Answer>();
  answerState = signal<AnswerState>(AnswerState.NO_CLICKED);

  @Output()
  outAnswerState = new EventEmitter<AnswerState>();
  
  // constructor(public elementRef: ElementRef) { }

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

    this.updateClassName();
    this.outAnswerState.emit(this.answerState());

  }

  updateClassName(){
    const div = this.answerDivRef?.nativeElement as HTMLElement;
    if (div) {
      div.setAttribute('class', this.getStatusClass() );
    }
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
