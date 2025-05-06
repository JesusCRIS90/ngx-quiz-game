import { Timer } from "../utils"

export function getTotalTime(timePerQuestion: number, totalQuestions: number): string {
    const totalTime = timePerQuestion * totalQuestions;
    return Timer.formatTime(totalTime);
}

export function shuffleInPlace<T>(array: T[]): void {

    for (let i = array.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [array[i], array[j]] = [array[j], array[i]];

    }
}

export function CategoryId2ApiNumber(category: string): number {

    switch (category) {
        case 'general':
            return 9;
        case 'book':
            return 10;
        case 'films':
            return 11;
        case 'music':
            return 12;
        case 'musicals':
            return 13;
        case 'television':
            return 14;
        case 'videogames':
            return 15;
        case 'boardgames':
            return 16;
        case 'science':
            return 17;
        case 'computers':
            return 18;
        case 'math':
            return 19;
        case 'mythology':
            return 20;
        case 'sports':
            return 21;
        case 'geography':
            return 22;
        case 'history':
            return 23;
        case 'politics':
            return 24;
        case 'art':
            return 25;
        case 'celebrities':
            return 26;
        case 'animals':
            return 27;
        case 'vehicles':
            return 28;
        case 'comics':
            return 29;
        case 'gadgets':
            return 30;
        case 'anime':
            return 31;
        case 'cartoon':
            return 32;

        default:
            return 9;
    }

}