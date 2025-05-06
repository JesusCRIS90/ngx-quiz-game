
export class Timer extends EventTarget {

    private initialSeconds: number = 0;
    private remainingSeconds: number = 0;
    private intervalId: number | null = null;
    private isRunning = false;

    constructor(timeString: string) {
        super();
        this.configTime( timeString );
    }

    protected configTime(timeString: string) {
        const [minutes, seconds] = timeString.split(":").map(Number);
        if (isNaN(minutes) || isNaN(seconds)) {
            throw new Error("Invalid time format. Use 'MMM:SS'");
        }

        this.initialSeconds = minutes * 60 + seconds;
        this.remainingSeconds = this.initialSeconds;
    }

    static formatTime(seconds: number): string {

        const mmDigits = (Math.floor(seconds / 60) >= 100) ? 3 : 2

        const mm = Math.floor(seconds / 60).toString().padStart(mmDigits, "0");
        const ss = (seconds % 60).toString().padStart(2, "0");
        return `${mm}:${ss}`;
    }

    public start(): void {

        if (this.isRunning || this.remainingSeconds <= 0) return;

        this.isRunning = true;
        this.intervalId = window.setInterval(() => {

            this.remainingSeconds--;

            this.dispatchEvent(
                new CustomEvent("tick", { detail: Timer.formatTime(this.remainingSeconds) })
            );

            if (this.remainingSeconds <= 0) {
                this.stop();
                this.dispatchEvent(new Event("timeout"));
            }
        }, 1000);
    }

    public pause(): void {
        if (this.isRunning && this.intervalId !== null) {
            clearInterval(this.intervalId);
            this.intervalId = null;
            this.isRunning = false;
        }
    }

    public stop(): void {
        if (this.intervalId !== null) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
        this.isRunning = false;
        this.remainingSeconds = 0;
    }

    public reset(): void {
        this.stop();
        this.remainingSeconds = this.initialSeconds;
    }

    public setTime(time: string) {
        this.configTime( time );
    }

    public getTime(): string {
        return Timer.formatTime(this.remainingSeconds);
    }

    public isTimerRunning(): boolean {
        return this.isRunning;
    }
}
