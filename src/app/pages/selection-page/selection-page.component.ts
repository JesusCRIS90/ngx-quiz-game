import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

import { StoragesManager } from '@beexy/tools';
import { ModalWindowService } from '@beexy/ngx-modals';

import {
  GridLayout1DComponent as Grid1D,
  VerticalLayoutComponent as FlexVert,
  HorizontalLayoutComponent as FlexHori,
  FixedWidthLayoutComponent as FixWidth
} from "@beexy/ngx-layouts"

import { DATA_KEY } from '../../utils';
import { AppData, Category } from '../../enums';

import { QuizApiServiceService } from "../../services"
import { QuizService } from '../../models';

import {
  OpendbtriviaData,
  API_Question
} from "../../models/interface"

import {
  SwitchableIconComponent,
  SwitchableTextComponent
} from "../../components"

import {CommonErrorWindowComponent} from "../../modals"


@Component({
  selector: 'app-selection-page',
  imports: [FixWidth, Grid1D, FlexVert, FlexHori, SwitchableTextComponent, SwitchableIconComponent],
  templateUrl: './selection-page.component.html',
})
export default class SelectionPageComponent {

  private storage = inject(StoragesManager);
  // private quizService = inject(QuizService);
  private readonly quizApi = inject(QuizApiServiceService);
  
  protected rootPath: string = '';
  protected categories: Category[] = [];
  protected difficulty: string[] = [];
  protected type: string[] = [];

  protected apiQuestions: API_Question[] = [];

  loadedData = signal<boolean>(false);
  disableBtn = signal<boolean>(false);

  constructor(
    private router: Router,
    private quizService: QuizService,
    private modalService: ModalWindowService ) {
    this.getDataFromStorage();
  }

  protected getDataFromStorage() {

    const data = this.storage.getStorageDataFromKey<AppData>(DATA_KEY);

    if (data !== null) {
      
      this.rootPath = data.selectionPage.rootPath;
      this.categories = data.selectionPage.categories;
      this.difficulty = data.selectionPage.difficultyLevel
      this.type = data.selectionPage.type;

      this.loadedData.set(true);
      return;
    }

    this.loadedData.set(false);
    return;
  }

  getCategories(): Category[] {
    return this.categories;
  }

  getRootPath(): string {
    return this.rootPath;
  }

  getDifficulties(): string[] {
    return this.difficulty;
  }

  getTypes(): string[] {
    return this.type;
  }

  getIconInfo( category: Category ): Category {
    
    const newCategory: Category = {
      name: category.name,
      icon: `${this.getRootPath()}/${category.icon}.png`
    }

    return newCategory;
  }

  getQuizQuestions(){
    
    this.quizApi.getQuestions({}).subscribe({
      next: (data:OpendbtriviaData) => {
        
        this.disableBtn.set(true);

        if( data.response_code === 0 ){

          this.prepareNewGame( data.results );
          // console.log("SELECTION-PAGE", this.quizService);
          // debugger;
          this.router.navigate(['/quiz-game']);

        } else {

          this.modalService.open({ component: CommonErrorWindowComponent });
          this.disableBtn.set(false);
        
        }
      },
      error: (err) => {
        console.error('Failed to fetch users', err);
        
        this.modalService.open({ component: CommonErrorWindowComponent });
        this.disableBtn.set(false);
      
      },
    });
  
  }

  private prepareNewGame( data: API_Question[] ) {
    this.quizService.newGame( data );
  }

}
