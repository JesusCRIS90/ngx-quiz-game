import { environment } from '../../environments/environment';

// export const DATA_PATH = '/assets/data/app-data.json';
export const DATA_PATH = `${environment.baseHref}/assets/data/app-data.json`;
export const DATA_KEY = "AppKey";

export const OPEN_TRIVIA_API = 'https://opentdb.com/api.php'

export const TIME_PER_QUESTION = 30;

export const EASY_POINTS = 10;
export const MEDIUM_POINTS = 20;
export const HARD_POINTS = 30;

export const TOTAL_QUESTIONS = 2;