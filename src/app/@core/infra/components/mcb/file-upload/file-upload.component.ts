import { Component, Input, forwardRef, EventEmitter, Output, ElementRef, ViewChild } from '@angular/core';
import {
    ControlValueAccessor, NG_VALUE_ACCESSOR, Validator, AbstractControl, ValidationErrors,
    NG_VALIDATORS, NgModel
} from '@angular/forms';
import { FileChangeEvent } from './types';

@Component({
    selector: 'app-file-upload',
    exportAs: 'mcbFileUpload',
    templateUrl: './file-upload.component.html',
    styleUrls: ['./file-upload.component.css'],
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => FileUploadComponent), multi: true },
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => FileUploadComponent), multi: true, }
    ]
})
export class FileUploadComponent implements ControlValueAccessor, Validator {
    @Input() accept: string; // file type filter
    @Input() placeholder = '';
    @ViewChild('realFileInput') realFileInput;
    @Input() get required() {
        return this.el.nativeElement.required;
    }

    set required(value: any) {
        if (value || value === '') {
            this.el.nativeElement.required = true;
        }
    }

    _disabled: boolean;
    _path = '';
    private file: any;
    private changeCallback: any = () => { };
    private touchedCallback: any = () => { };

    constructor(private el: ElementRef) {
    }

    _onFileChange(event) {
        const file = event.target.files[0];
        if (!file) {
            return;
        }

        const fileReader = new FileReader();
        fileReader.addEventListener('load', e => {
            const fileName = file.name;
            const base64 = fileReader.result as string;
            const parts = base64.split(',');
            const mime = parts[0];
            const base64Content = parts[1];

            this.file = file;
            this._path = fileName;

            this.changeCallback({
                base64Content,
                fileName,
                mime
            } as FileChangeEvent);
        });
        fileReader.readAsDataURL(file);
    }

    _onInputClick(realFileInputRef) {
        this.touchedCallback();
        realFileInputRef.click();
    }

    _onOpenDialogClick(realFileInputRef: any) {
        realFileInputRef.value = null;
        realFileInputRef.click();
    }

    // ControlValueAccessor Implementation
    writeValue(value: any): void {
        this.file = value;
        this.realFileInput = null;
        this._path = value && value ? '[file]' : '';
    }

    registerOnChange(fn: any): void {
        this.changeCallback = fn;
    }

    registerOnTouched(fn: any): void {
        this.touchedCallback = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this._disabled = isDisabled;
    }
    // End of ControlValueAccessor Implementation

    // Validator Implementation
    validate(c: AbstractControl): ValidationErrors {
        return null;
    }

    registerOnValidatorChange?(fn: () => void): void {
    }
    // End Validator Implementation
}
