import { Component } from '@angular/core';

import {
  PairLayoutComponent as FlexPair,
  GridLayout1DComponent as Grid1D,
  VerticalLayoutComponent as FlexVert,
  CenterLayoutComponent as CenterLayout,
  PAIR_DISTRIBUTION as PAIR_POLICY,
  POLICY_POSITION as GRID_POLICY,
} from "@beexy/ngx-layouts"

import { QuizService, Scores } from '../../models';

@Component({
  selector: 'app-results-page',
  imports: [FlexVert, FlexPair, Grid1D, CenterLayout],
  templateUrl: './results-page.component.html',
})
export default class ResultsPageComponent {

  PAIR_POLICY = PAIR_POLICY;
  GRID_POLICY = GRID_POLICY;

  constructor(private quizService: QuizService) { }

  getUserScores(): Scores {
    return this.quizService.getScores(); 
  }
}


