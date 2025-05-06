import { Component, signal } from '@angular/core';

import {
  PairLayoutComponent as FlexPair,
  GridLayout1DComponent as Grid1D,
  VerticalLayoutComponent as FlexVert,
  CenterLayoutComponent as CenterLayout,
  PAIR_DISTRIBUTION as PAIR_POLICY,
  POLICY_POSITION as GRID_POLICY,
} from "@beexy/ngx-layouts"

import { QuizService, Scores } from '../../models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-results-page',
  imports: [FlexVert, FlexPair, Grid1D, CenterLayout],
  templateUrl: './results-page.component.html',
})
export default class ResultsPageComponent {

  PAIR_POLICY = PAIR_POLICY;
  GRID_POLICY = GRID_POLICY;
  userScores = signal<Scores>( {} as Scores );

  constructor(
    private router: Router,
    private quizService: QuizService) {
    this.userScores.set(this.quizService.getScores());
  }

  getWrongAnswers(): number{
    return this.userScores().totalQuestions - this.userScores().succesAnswers;
  }

  onClickNewGame(){
    this.router.navigate(['/selection']);
  }

  onClickRepeat(){
    this.quizService.repeatGame();
    this.router.navigate(['/quiz-game']);
  }
}


