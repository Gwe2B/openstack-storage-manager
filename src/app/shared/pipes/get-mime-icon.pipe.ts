import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getMimeIcon'
})
export class GetMimeIconPipe implements PipeTransform {
  static readonly ICONS = [
    'fa-regular fa-file-lines',
    'fa-regular fa-image',
    'fa-regular fa-file-zipper',
    'fa-regular fa-file-video',
    'fa-regular fa-file-audio'
  ]
  
  static readonly MIMES = [
    ['text'],
    ['image'],
    ['archive', 'zip'],
    ['video'],
    ['audio']
  ]

  static getMimeIcon(value: string): string {
    for(let icoIndex = 0; icoIndex < GetMimeIconPipe.MIMES.length; icoIndex++) {
      for(let test of GetMimeIconPipe.MIMES[icoIndex]) {
        if(value.includes(test)) {
          return GetMimeIconPipe.ICONS[icoIndex];
        }
      }
    }
    
    return 'fa-regular fa-file';
  }

  transform(value: string, ...args: unknown[]): string {
    return GetMimeIconPipe.getMimeIcon(value);
  }

}
