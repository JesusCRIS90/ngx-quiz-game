import { Component, input, OnDestroy, OnInit, signal, effect, Output, EventEmitter } from '@angular/core';

import { Timer } from "../../utils"

export enum TIMER_STATE {
  START,
  STOP,
  RESET,
  PAUSE
}

@Component({
  selector: 'quiz-timer',
  imports: [],
  templateUrl: './timer.component.html',
})
export class TimerComponent implements OnInit, OnDestroy {

  private timer: Timer;

  setStateTimer = input<TIMER_STATE>(TIMER_STATE.STOP);
  setTime = input<string>("01:00");

  // Output events
  @Output() tick = new EventEmitter<string>();
  @Output() timeout = new EventEmitter<void>();
  
  timerState = signal<TIMER_STATE>(TIMER_STATE.STOP);
  remainingTime = signal<string>('');
  isTimeout = signal<boolean>(false);

  constructor() {

    // this.timer = new Timer(getTotalTime(TIME_PER_QUESTION, TOTAL_QUESTIONS));
    this.timer = new Timer( this.setTime() );

    this.timer.addEventListener("tick", (event: Event) => {
      const customEvent = event as CustomEvent<string>;
      const time = customEvent.detail;

      this.remainingTime.set(customEvent.detail);
      this.tick.emit(time);  // Emit output event
    });

    this.timer.addEventListener("timeout", () => {
      this.isTimeout.set(true);
      this.timeout.emit();   // Emit output event
      this.stop();
    });

    effect(() => {
      this.onTimerStateChange(this.setStateTimer());
    });
  }

  ngOnInit(): void {
    this.timer.setTime( this.setTime() );
    // this.start();
  }

  ngOnDestroy(): void {
    this.stop();
  }

  // setValueTime(time:string){
  // }

  get timerStatus(): TIMER_STATE {
    return this.timerState();
  }

  start() {

    if ( this.timerStatus === TIMER_STATE.START) return;

    this.remainingTime.set(this.timer.getTime());
    this.isTimeout.set(false);
    this.timer.start();
    this.timerState.set( TIMER_STATE.START );
  }

  stop() {
    this.timer.stop();
    this.timerState.set( TIMER_STATE.STOP );
  }

  reset() {
    this.timer.reset();
    this.timerState.set( TIMER_STATE.RESET );
  }

  pause() {
    this.timer.pause();
    this.timerState.set( TIMER_STATE.PAUSE );
  }

  private onTimerStateChange(state: TIMER_STATE) {

    switch (state) {

      case TIMER_STATE.PAUSE:
        this.pause(); return;

      case TIMER_STATE.RESET:
        this.reset(); return;

      case TIMER_STATE.START:
        this.start(); return;

      case TIMER_STATE.STOP:
        this.stop(); return;

      default:
        return;
    }
  }
}