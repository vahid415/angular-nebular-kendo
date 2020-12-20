import { FormControl, ValidatorFn } from "@angular/forms";

export function NationalCodeValidatorFn(): ValidatorFn {
  return (control: FormControl): { [key: string]: any } => {
    return nationalCodeVerify(control.value) ? null : {
      nationalCodeValidator: {
        valid: false
      }
    };
  };
}

export function nationalCodeVerify(params) {
  if (!params) { return true; }
  if (params === '1111111111' || params === '2222222222' || params === '3333333333' ||
    params === '4444444444' || params === '5555555555' || params === '6666666666' ||
    params === '7777777777' || params === '8888888888' || params === '9999999999' || !/^\d{10}$/.test(params)) {
    return false;
  } else {
    const check = parseInt(params[9], null);
    let sum = 0;
    let i;
    for (i = 0; i < 9; ++i) {
      sum += parseInt(params[i], null) * (10 - i);
    }
    sum %= 11;
    if ((sum < 2 && check === sum) || (sum >= 2 && check + sum === 11)) {
      return true;
    }
  }
}
