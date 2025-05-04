GPT, at the end I could fix the problem. Here the code:

```ts
import { Component, ElementRef, EventEmitter, input, OnChanges, Output, signal, SimpleChanges } from '@angular/core';
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

  allowClick = input.required<boolean>();
  answer = input.required<Answer>();
  answerState = signal<AnswerState>(AnswerState.NO_CLICKED);

  constructor(private elementRef: ElementRef) { }
  
  ngOnChanges(changes: SimpleChanges): void {
    if( this.allowClick() ){
      this.resetClassNames();
    }
  }

  get statusClass(): string {
    return this.getStatusClass();
  }


  @Output()
  outAnswerState = new EventEmitter<AnswerState>();

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

    const nativeElement = this.elementRef.nativeElement as HTMLElement;

    // Look for the div inside this component (you may refine this selector)
    const targetDiv = nativeElement.querySelector('#answer-conatiner');

    if (targetDiv) {
      targetDiv.setAttribute('class', 'answer-default');
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
```

```html
<div id="answer-conatiner" [ngClass]="statusClass" (click)="checkAnswer()">
    {{ getAnswerText() }}
</div>
```