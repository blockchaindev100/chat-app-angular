import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../serivce/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CONSTANTS } from '../../../constants/contant';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) { }

  loginGroup: FormGroup = this.fb.group({
    email: this.fb.control('', [Validators.required, Validators.email]),
    password: this.fb.control('', Validators.required)
  })

  signupGroup: FormGroup = this.fb.group({
    firstName: this.fb.control('', Validators.required),
    lastName: this.fb.control('', Validators.required),
    email: this.fb.control('', [Validators.required, Validators.email]),
    password: this.fb.control('', Validators.required)
  })

  login() {
    if (this.loginGroup.valid) {
      this.api.login(this.loginGroup.value).subscribe((ele) => {
        localStorage.setItem(CONSTANTS.CHATIFY_TOKEN, ele.token);
        localStorage.setItem(CONSTANTS.CHATIFY_USER_ID, ele.userid);
        this.router.navigate(["/base"]);
      }, (err) => {
        this.openSnackBar("Login Failed")
      })
    } else {
      this.loginGroup.markAllAsTouched();
    }
  }

  signup() {
    if (this.signupGroup.valid) {
      this.api.signup(this.signupGroup.value).subscribe((ele) => {
        this.openSnackBar("Successfully Created")
      }, (err) => {
        this.openSnackBar("Signup Failed")
      })
    } else {
      this.signupGroup.markAllAsTouched();
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, "", {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }
}
