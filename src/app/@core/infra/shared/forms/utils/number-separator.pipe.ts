import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'mcbNumberSeparator'
})
export class McbNumberSeparatorPipe implements PipeTransform {
  constructor() {
  }
  transform(num) {
    const numParts = num.toString().split(".");
    numParts[0] = numParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return numParts.join(",");
  }
  // transform(value: string): string {
  //   return this.localeString(value);
  // }

  // localeString(nStr) {
  //   if (nStr === '') return '';
  //   let x, x1, x2, rgx, y1, y2;
  //   nStr += '';
  //   x = nStr.split('.');
  //   x1 = x[0];
  //   x2 = x.length > 1 ? '.' + x[1] : '';
  //   rgx = /(\d+)(\d{3})/;
  //   while (rgx.test(x1)) {
  //     x1 = x1.replace(rgx, '$1' + ',' + '$2');
  //   }
  //
  //   /** If value was inputed by user, it could have many decimals(up to 7)
  //    so we need to reformat previous x1 results */
  //   if (x1.indexOf('.') !== -1) {
  //     y1 = x1.slice(x1.lastIndexOf('.')).replace(/\./g, '');
  //
  //     y2 = x1.split('.');
  //     x = y2[0] + y1;
  //   } else {
  //     x = x1 + x2;
  //   }
  //
  //   return x;
  // }
}
