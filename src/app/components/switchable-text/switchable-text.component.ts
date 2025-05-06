import { Component, EventEmitter, input, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';


import {
  VerticalLayoutComponent as FlexVert
} from "@beexy/ngx-layouts"

import { SelectedItem, SelectedText } from '../../enums';


enum SwitchableState {
  ACTIVE,
  DISABLE
}

@Component({
  selector: 'switchable-text',
  imports: [FlexVert, CommonModule],
  templateUrl: './switchable-text.component.html',
})
export class SwitchableTextComponent {

  selectedText = input.required<SelectedText>();

  state = signal<SwitchableState>(SwitchableState.DISABLE);

  @Output()
  outState = new EventEmitter<SelectedItem>();

  getText() {
    return this.selectedText().text;
  }

  getId(){
    return this.selectedText().id;
  }

  isActive() {
    if (this.state() === SwitchableState.ACTIVE) return true;
    return false;
  }

  updateSwitchState() {

    if (this.state() === SwitchableState.ACTIVE)
      this.state.set(SwitchableState.DISABLE);
    else
      this.state.set(SwitchableState.ACTIVE);

    this.outState.emit({
      id: this.getId(),
      state: this.state()
    });
  }

  disactivate(){
    this.state.set( SwitchableState.DISABLE );
  }

}
