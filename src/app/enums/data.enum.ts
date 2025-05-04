export interface AppData {
    selectionPage: SelectionPage;
}

export interface SelectionPage {
    rootPath:        string;
    categories:      Category[];
    difficultyLevel: string[];
    type:            string[];
}

export interface Category {
    icon: string;
    name: string;
}