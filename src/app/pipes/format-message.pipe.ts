import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'formatMessage'
})
export class FormatMessagePipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string): SafeHtml {
    if (!value) return '';

    const formatted = value
      .replace(/\n/g, '<br>')
      .replace(/\t/g, '&emsp;');

    return this.sanitizer.bypassSecurityTrustHtml(formatted);
  }
}