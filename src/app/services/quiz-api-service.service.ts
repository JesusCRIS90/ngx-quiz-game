import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { OPEN_TRIVIA_API, CategoryId2ApiNumber } from "../utils"

import {
  OpendbtriviaData,
  API_Question,
} from "../models/interface"

import {
  ApiQuizConfig
} from "../enums"

@Injectable({
  providedIn: 'root'
})
export class QuizApiServiceService {

  private readonly http = inject(HttpClient);

  constructor() { }

  getQuestions(params: ApiQuizConfig): Observable<OpendbtriviaData> {

    const queryParams: string[] = [];

    // Required parameter
    queryParams.push(`amount=${params.numberQuestions}`);

    // Optional parameters
    if (params.category && params.category.id) {
      queryParams.push(`category=${CategoryId2ApiNumber(params.category.id)}`);
    }

    if (params.difficulty && params.difficulty.id) {
      queryParams.push(`difficulty=${params.difficulty.id}`);
    }

    if (params.type && params.type.id) {
      queryParams.push(`type=${params.type.id}`);
    }

    const queryString = queryParams.join("&");
    const APIRequest = `${OPEN_TRIVIA_API}?${queryString}`;

    // console.log(APIRequest);

    return this.http.get<OpendbtriviaData>(APIRequest);
  }

}


// https://opentdb.com/api.php?amount=10&category=24&difficulty=easy&type=multiple