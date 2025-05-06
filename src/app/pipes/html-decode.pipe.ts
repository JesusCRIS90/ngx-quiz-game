import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'htmlDecode'
})
export class HtmlDecodePipe implements PipeTransform {

    transform(value: string | null | undefined): string {

        if (!value) return '';

        const txt = document.createElement('textarea');
        txt.innerHTML = value;
        return txt.value;
    }
}