export interface AppData {
    selectionPage: SelectionPage;
}

export interface SelectionPage {
    rootPath: string;
    categories: Category[];
    difficultyLevel: SelectedText[];
    type: SelectedText[];
}

export interface Category {
    icon: string;
    name: string;
    id: string;
}

export interface SelectedText {
    id: string;
    text: string;
}

export enum SwitchableState {
    ACTIVE,
    DISABLE
}

export interface SelectedItem {
    id: string;
    state: SwitchableState
}

export interface ApiQuizConfig {
    category: SelectedItem | null,
    difficulty: SelectedItem | null
    type: SelectedItem | null
    numberQuestions: number
}

export interface ErrorMessage {
    message: string;
}