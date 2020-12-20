import { NgForm } from '@angular/forms';
import { ChangePasswordDto } from './type';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UIService } from './../../../../services/ui.service';
import { PortalUserChangePasswordService } from './user-change-password.service';
import { ErrorMessageType } from './../../../../../../infra/shared/types/error-message';
import { UIMessageBrokerService } from '../../../../services/ui-message-broker.service';
import { TranslatorService } from './../../../../../../infra/shared/localization/lang/translator.service';
@Component({
  selector: 'app-user-change-password',
  templateUrl: './user-change-password.component.html',
  styleUrls: [ './user-change-password.component.css' ]
})
export class PortalUserChangePasswordComponent implements OnInit {
  showWindow = false;
  showNewPass = false;
  showCurrentPass = false;
  showConfirmPass = false;
  @ViewChild('form') form: NgForm;
  errorTypeNew: ErrorMessageType = new ErrorMessageType();
  errorTypeCurrent: ErrorMessageType = new ErrorMessageType();
  errorTypeConfirm: ErrorMessageType = new ErrorMessageType();
  changePassModel: ChangePasswordDto = new ChangePasswordDto();
  regexEng: RegExp = new RegExp('^[a-zA-Z0-9$@$!%*?&#^-_. +]+$');
  constructor (
    private ui: UIService,
    private tr: TranslatorService,
    private changePassService: PortalUserChangePasswordService,
    private uiMsgBroker: UIMessageBrokerService
  ) { }

  ngOnInit(): void {
    this.uiMsgBroker.showChangePassWindow.subscribe(res => {
      this.showWindow = res;
      this.changePassModel = new ChangePasswordDto();
    });
    this.errorTypeCurrent.customErrorMsg = this.errorTypeNew.customErrorMsg = this.errorTypeConfirm.customErrorMsg =
      this.tr.translate('validationPersianInputErr');
  }

  closeWindowChangePass() {
    this.showWindow = this.showNewPass = this.showCurrentPass = this.showConfirmPass = false;
    this.resetForm();
  }

  toggleEye(event) {
    if (this.changePassModel.currentPassword
      || this.changePassModel.newPassword
      || this.changePassModel.confirmPassword) {
      switch (event) {
        case 'currentPass': {
          this.showCurrentPass = !this.showCurrentPass;
          break;
        }
        case 'newPass': {
          this.showNewPass = !this.showNewPass;
          break;
        }
        case 'confirmPass': {
          this.showConfirmPass = !this.showConfirmPass;
          break;
        }
      }
    }
  }

  validityInput(value, type) {
    if (!value) {
      if (type === 'current') {
        this.showCurrentPass = false;
      } else if (type === 'new') {
        this.showNewPass = false; this.changePassModel.confirmPassword = null;
      } else if (type === 'confirm') { this.showConfirmPass = false; }
      value = null;
    } else {
      if (this.changePassModel.currentPassword && this.changePassModel.newPassword) {
        if (this.changePassModel.currentPassword === this.changePassModel.newPassword) {
          this.errorTypeNew.customErrorMsg = this.tr.translate('currentPassSameIsNewPassErr');
          this.form.controls[ 'newPassword' ].setErrors([ 'err' ]);
        } else { this.form.controls[ 'newPassword' ].updateValueAndValidity(); }
      }
      if (this.changePassModel.newPassword && this.changePassModel.confirmPassword) {
        if (this.changePassModel.newPassword !== this.changePassModel.confirmPassword) {
          this.errorTypeConfirm.customErrorMsg = this.tr.translate('inequalPassword');
          this.form.controls[ 'confirmPassword' ].setErrors([ 'err1' ]);
        } else { this.form.controls[ 'confirmPassword' ].updateValueAndValidity(); }
      }
    }
  }

  onChangePassClick() {
    if (this.changePassModel.newPassword !== this.changePassModel.confirmPassword) {
      this.ui.showModal('newPassNotSameConfirmPassErr', { style: 'error' });
      return;
    }
    if (this.changePassModel.currentPassword === this.changePassModel.newPassword) {
      this.ui.showModal('currentPassSameIsNewPassErr', { style: 'error' });
      return;
    }
    this.ui.showConfirm('changePassword', 'areYouSure', () => {
      this.changePassService.changePassword(this.changePassModel).subscribe(x => {
        this.ui.showToast('changePasswordSuccess', { timer: 5000 });
        this.closeWindowChangePass();
      });
    });
  }

  resetForm() {
    if (!this.changePassModel.currentPassword || !this.showWindow) {
      this.form.control.reset();
    }
  }

}
