import { FormField } from './../../shares/components/form-field/form-field.component';
import { MVInputFormField } from './../../shares/components/input/input.component';
import { MVInputField, MVInputFieldPrefix, MVInputFieldSuffix, MVInputLabel } from './../../shares/components/input/input.directive';
import { LoadingService } from './../../shares/components/loading/loading.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '@core/authentication/services/authentication.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { MVButton } from 'src/app/shares/components/button/button.component';
import { IAuthRequest } from '@core/authentication/interfaces/auth-request.interface';
import { CodeService } from '@core/interfaces';
import { MatIconModule } from '@angular/material/icon';
import { FormFieldLabelDirective, FormFieldPrefixDirective, FormFieldSufixDirective } from 'src/app/shares/components/form-field/form-field.directive';

const COMPONENTS = [
  MVButton,
  MVInputField,
  MVInputFieldPrefix,
  MVInputFieldSuffix,
  MVInputFormField,
  MVInputLabel,

  FormField,
  FormFieldLabelDirective,
  FormFieldPrefixDirective,
  FormFieldSufixDirective
]

const MODULES = [
  CommonModule,
  ReactiveFormsModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule
]

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [...MODULES, ...COMPONENTS],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  isLogin: boolean = true;
  constructor(
    private fb: FormBuilder,
    private authenService: AuthenticationService,
    private router: Router,
    private _loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.initFormLogin();
  }

  initFormLogin() {
    this.formLogin = this.fb.group({
      username: ['hell', Validators.required],
      password: [null, Validators.required],
    });
  }

  onSubmit() {
    if (!this.formLogin.valid) return;
    const authRequest: IAuthRequest = {... this.formLogin.value };
    this._loadingService.start()
    this.authenService.login(authRequest).subscribe(response => {
      if (response.code !== CodeService.SUCCESS) {

      }

      this._loadingService.stop();
    })
  }

  changeForm() {
    this.isLogin = !this.isLogin;
  }
}
