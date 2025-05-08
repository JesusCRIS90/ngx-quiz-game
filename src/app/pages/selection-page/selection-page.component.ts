import { Component, inject, QueryList, signal, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';

import { StoragesManager } from '@beexy/tools';
import { ModalWindowService } from '@beexy/ngx-modals';

import {
  GridLayout1DComponent as Grid1D,
  VerticalLayoutComponent as FlexVert,
  HorizontalLayoutComponent as FlexHori,
  FixedWidthLayoutComponent as FixWidth,
  CenterLayoutComponent as CenterLayout
} from "@beexy/ngx-layouts"

import { DATA_KEY, getRightPath } from '../../utils';
import { AppData, Category, SelectedItem, SwitchableState, SelectedText, ApiQuizConfig, ErrorMessage } from '../../enums';

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

import { CommonErrorWindowComponent } from "../../modals"


@Component({
  selector: 'app-selection-page',
  imports: [CenterLayout, FixWidth, Grid1D, FlexVert, FlexHori, SwitchableTextComponent, SwitchableIconComponent],
  templateUrl: './selection-page.component.html',
})
export default class SelectionPageComponent {

  @ViewChildren(SwitchableIconComponent)
  categoriesComponents!: QueryList<SwitchableIconComponent>;

  @ViewChildren('difficultyComponents')
  difficultyComponents!: QueryList<SwitchableTextComponent>;

  @ViewChildren('typeComponents')
  typeComponents!: QueryList<SwitchableTextComponent>;

  private storage = inject(StoragesManager);
  private readonly quizApi = inject(QuizApiServiceService);

  protected rootPath: string = '';
  protected categories: Category[] = [];
  protected difficulty: SelectedText[] = [];
  protected type: SelectedText[] = [];


  protected selectedCategory: SelectedItem | null = null;
  protected selectedDifficulty: SelectedItem | null = null;
  protected selectedType: SelectedItem | null = null;

  // protected apiQuestions: API_Question[] = [];

  loadedData = signal<boolean>(false);
  disableBtn = signal<boolean>(false);

  constructor(
    private router: Router,
    private quizService: QuizService,
    private modalService: ModalWindowService) {
    this.getDataFromStorage();
  }

  protected getDataFromStorage() {

    const data = this.storage.getStorageDataFromKey<AppData>(DATA_KEY);

    if (data !== null) {

      this.rootPath = getRightPath(data.selectionPage.rootPath);
      this.categories = data.selectionPage.categories;
      this.difficulty = data.selectionPage.difficultyLevel;
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

  getDifficulties(): SelectedText[] {
    return this.difficulty;
  }

  getTypes(): SelectedText[] {
    return this.type;
  }

  getIconInfo(category: Category): Category {

    const newCategory: Category = {
      name: category.name,
      icon: `${this.getRootPath()}/${category.icon}.png`,
      id: category.id
    }

    return newCategory;
  }

  protected getApiQuizParams(): ApiQuizConfig {
    return {
      category: this.selectedCategory,
      difficulty: this.selectedDifficulty,
      type: this.selectedType,
      numberQuestions: 10
    }
  }

  getQuizQuestions() {

    // Avoid User/Client click severals time repeateadly
    this.disableBtn.set(true);

    this.quizApi.getQuestions(this.getApiQuizParams()).subscribe({

      next: (data: OpendbtriviaData) => {

        if (data.response_code === 0) {
          this.prepareNewGame(data.results);
          this.router.navigate(['/quiz-game']);
        } else {
          this.modalService.open<ErrorMessage>(
            {
              component: CommonErrorWindowComponent,
              data: { message: `It seems that your Quiz Configurations is not valid. \n Please choose another one.` } as ErrorMessage
            });
          this.disableBtn.set(false);
        }
      },
      error: (err) => {
        console.error('Failed to fetch users', err);

        console.log(err);
        this.modalService.open<ErrorMessage>(
          {
            component: CommonErrorWindowComponent,
            data: { message: `Error Type:${err.statusText}.\nMessage:${err.message}` } as ErrorMessage
          });
        this.disableBtn.set(false);

      },
    });

  }

  private prepareNewGame(data: API_Question[]) {
    this.quizService.newGame(data);
  }

  protected updateCategorySelected(valueEmitted: SelectedItem) {

    // Selected and Emited are the same
    if (this.selectedCategory !== null && this.selectedCategory.id === valueEmitted.id) {
      if (valueEmitted.state === SwitchableState.DISABLE) {
        this.find_and_disactivate_with_id(valueEmitted.id, this.selectedCategory, this.categoriesComponents);
        this.selectedCategory = null;
        return;
      }
    }

    // Selected and Emited are different
    if (this.selectedCategory !== null && this.selectedCategory.id !== valueEmitted.id) {

      // 1. Find the previously selected component using its ID
      const previous = this.categoriesComponents.find(icon => icon.getId() === this.selectedCategory!.id);

      // 2. Call the method to deactivate it
      if (previous) {
        previous.disactivate(); // Assumes your component has this method
      }
    }

    this.selectedCategory = valueEmitted;
  }

  protected updateDifficultySelected(valueEmitted: SelectedItem) {

    // debugger;
    // Selected and Emited are the same
    if (this.selectedDifficulty !== null && this.selectedDifficulty.id === valueEmitted.id) {
      if (valueEmitted.state === SwitchableState.DISABLE) {
        this.find_and_disactivate_with_id(valueEmitted.id, this.selectedDifficulty, this.difficultyComponents);
        this.selectedDifficulty = null;
        return;
      }
    }

    // debugger;
    // Selected and Emited are different
    if (this.selectedDifficulty !== null && this.selectedDifficulty.id !== valueEmitted.id) {

      // 1. Find the previously selected component using its ID
      const previous = this.difficultyComponents.find(icon => icon.getId() === this.selectedDifficulty!.id);

      // 2. Call the method to deactivate it
      if (previous) {
        previous.disactivate(); // Assumes your component has this method
      }
    }

    // debugger;
    this.selectedDifficulty = valueEmitted;
  }

  protected updateTypeSelected(valueEmitted: SelectedItem) {

    // Selected and Emited are the same
    if (this.selectedType !== null && this.selectedType.id === valueEmitted.id) {
      if (valueEmitted.state === SwitchableState.DISABLE) {
        this.find_and_disactivate_with_id(valueEmitted.id, this.selectedType, this.typeComponents);
        this.selectedType = null;
        return;
      }
    }

    // Selected and Emited are different
    if (this.selectedType !== null && this.selectedType.id !== valueEmitted.id) {

      // 1. Find the previously selected component using its ID
      const previous = this.typeComponents.find(icon => icon.getId() === this.selectedType!.id);

      // 2. Call the method to deactivate it
      if (previous) {
        previous.disactivate(); // Assumes your component has this method
      }
    }

    this.selectedType = valueEmitted;
  }

  private find_and_disactivate_with_id(
    id: string,
    selectedItem: SelectedItem | null,
    componentsList: QueryList<SwitchableIconComponent | SwitchableTextComponent>
  ) {
    const element = componentsList.find(icon => icon.getId() === selectedItem!.id);
    if (element) {
      element.disactivate(); // Assumes your component has this method
    }
  }

}
