import { Component, Input } from '@angular/core';

import {
  FormatMessagePipe
} from "../../pipes"

@Component({
  selector: 'app-common-error-window',
  imports: [FormatMessagePipe],
  templateUrl: './common-error-window.component.html',
})
export class CommonErrorWindowComponent {
  @Input() message!: string;
}
