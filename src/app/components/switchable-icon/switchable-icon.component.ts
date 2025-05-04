import { Component, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  ImageComponent as Image,
} from "@beexy/ngx-components"

import {
  VerticalLayoutComponent as FlexVert
} from "@beexy/ngx-layouts"

import {
  Category
} from "../../enums"

enum SwitchableState {
  ACTIVE,
  DISABLE
}

@Component({
  selector: 'switchable-icon',
  imports: [Image, FlexVert, CommonModule],
  templateUrl: './switchable-icon.component.html',
})
export class SwitchableIconComponent {

  iconInfo = input.required<Category>();

  state = signal<SwitchableState>(SwitchableState.DISABLE);

  getImage() {
    return this.iconInfo().icon;
  }
  getName() {
    return this.iconInfo().name;
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
