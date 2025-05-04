import { Component, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';


import {
  VerticalLayoutComponent as FlexVert
} from "@beexy/ngx-layouts"


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

  text = input.required<string>();

  state = signal<SwitchableState>(SwitchableState.DISABLE);

  getText() {
    return this.text();
  }

  isActive(){
    if (this.state() === SwitchableState.ACTIVE) return true;
    return false;
  }

  updateSwitchState() {

    if (this.state() === SwitchableState.ACTIVE)
      this.state.set(SwitchableState.DISABLE);
    else
      this.state.set(SwitchableState.ACTIVE);
  }

}
