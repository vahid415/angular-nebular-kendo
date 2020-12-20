import {FormControl, ValidatorFn} from "@angular/forms";

export function WebsiteValidatorFn(): ValidatorFn {
  let regex: RegExp = new RegExp("http(s)?://([\\w-]+\\.)+[\\w-]+(/[\\w- ./?%&amp;=]*)?");
  return (control: FormControl): { [key: string]: any } => {
    return regex.test(control.value) ? null : {
      websiteValidator: {
        valid: false
      }
    };
  };
}
