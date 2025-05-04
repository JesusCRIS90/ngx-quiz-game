import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { OPEN_TRIVIA_API } from "../utils"

import {
  OpendbtriviaData,
  API_Question
} from "../models/interface"

@Injectable({
  providedIn: 'root'
})
export class QuizApiServiceService {

  private readonly http = inject(HttpClient);

  constructor() { }

  getQuestions( params: any ): Observable<OpendbtriviaData> {
    return this.http.get<OpendbtriviaData>(`${OPEN_TRIVIA_API}?amount=10`);
  }

}
