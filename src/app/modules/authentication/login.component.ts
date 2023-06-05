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
import { AuthenticationService } from 'src/app/core/services/implementations/authentication.service';
import { TokenService } from 'src/app/core/services/implementations/token.service';
import { MaterialsModule } from 'src/app/shares/modules/materials.module';
@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, MaterialsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  isLogin: boolean = true;
  constructor(
    private fb: FormBuilder,
    private authenService: AuthenticationService,
    private router: Router,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.initFormLogin();
  }

  initFormLogin() {
    this.form = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    if (this.isLogin) {
      this.authenService.logIn(this.form.value).subscribe((res) => {
        if (res) {
          this.tokenService.storeAccessToken(res.accessToken);
          this.router.navigate(['']);
        }
      });
    } else {
      this.authenService.register(this.form.value).subscribe((res) => {
        console.log('register', res);
      });
    }
  }

  changeForm() {
    this.isLogin = !this.isLogin;
  }
}
