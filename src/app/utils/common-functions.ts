import { Timer } from "../utils"

export function getTotalTime( timePerQuestion: number, totalQuestions: number ):string{
    const totalTime = timePerQuestion * totalQuestions;
    return Timer.formatTime( totalTime );
}

export function shuffleInPlace<T>(array: T[]): void {

    for (let i = array.length - 1; i > 0; i--) {
    
        const j = Math.floor(Math.random() * (i + 1));
    
        [array[i], array[j]] = [array[j], array[i]];
    
    }
}