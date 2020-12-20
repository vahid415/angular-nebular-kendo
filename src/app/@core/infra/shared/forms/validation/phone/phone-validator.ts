import {FormControl, ValidatorFn} from '@angular/forms';

export function PhoneValidatorFn(): ValidatorFn {
  let regex: RegExp = new RegExp('0([0-9]){10}$');
  return (control: FormControl): { [key: string]: any } => {
    return regex.test(control.value) ? null : {
      phoneValidator: {
        valid: false
      }
    };
  };
}
