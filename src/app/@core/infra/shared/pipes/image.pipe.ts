import { PipeTransform, Pipe } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
    name: 'mcbImage'
})
export class ImagePipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer, ) {
    }

    transform(value: any): any {
        if (value instanceof Blob) {
            const blobUrl = URL.createObjectURL(value);
            return this.sanitizer.bypassSecurityTrustUrl(blobUrl);
        }

        return '';
    }
}
