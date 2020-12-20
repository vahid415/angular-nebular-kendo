import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { FormState } from './form-state';
import { Observable } from 'rxjs';
import { TranslatorService } from '../../localization/lang/translator.service';

@Injectable({
  providedIn: 'root',
})
export class FormDeactivationGuard implements CanActivateChild {
  constructor (
    private formState: FormState,
    private translator: TranslatorService) {
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.formState.saved) {
      return true;
    } else {
      const answer = confirm(this.translator.translate('changes-are-not-saved'));
      // We do not show this message again, unless a form 'change' event raises again
      this.formState.saved = answer;
      return answer;
    }
  }
}
