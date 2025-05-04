/*  
    INTERFACE FROM API
*/
export interface OpendbtriviaData {
    response_code: number;
    results: API_Question[];
}

export enum Difficulty {
    Easy = "easy",
    Hard = "hard",
    Medium = "medium",
}

export enum Type {
    Boolean = "boolean",
    Multiple = "multiple",
}

export interface API_Question {
    type: Type;
    difficulty: Difficulty;
    category: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
}

/*  
    INTERFACE TO WEBSITE
*/

export interface Question {
    type: Type;
    difficulty: Difficulty;
    category: string;
    answers: Answer[];
    question: string;
    points: number;
}

export interface Answer {
    text: string;
    isCorrect: boolean;
    isSelected: boolean;
}

export enum AnswerState {
    NO_CLICKED,
    CORRECT,
    INCORRECT
}