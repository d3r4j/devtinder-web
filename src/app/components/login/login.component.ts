import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthUserService } from 'src/app/services/auth-user.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  loggedInUser = {};
  formSwitch: boolean = true;

  constructor(private service: LoginService, private router: Router, private authUser: AuthUserService, private fb: FormBuilder) { }



  emailId = new FormControl('', [Validators.required]);
  password = new FormControl('', Validators.required);

  loginForm = new FormGroup({
    emailId: this.emailId,
    password: this.password
  })

  loginError: string = ''

  signUpFrom = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    emailId: ['', Validators.required],
    password: ['', Validators.required]
  })

  onClick() {
    if (this.loginForm.valid) {
      // console.log("form is valid")
      const emailId = this.emailId.value
      const password = this.password.value
      this.service.login(emailId!, password!).subscribe({
        next: (res) => {
          this.loggedInUser = res;
          this.authUser.setUser(this.loggedInUser);
          // console.log("loggedin user res", this.loggedInUser);

          this.service.clearFeedCache()
          this.service.feed()
          this.router.navigate(['/'])
        },
        error: (err) => {
          this.loginError = JSON.stringify(err.error, null, 2);
          // console.log("login incorrect user details" + JSON.stringify(err, null, 2))
        }
      })
    }
    else {
      alert("enter valid email and password to login");
    }
  }

  toogleForm() {
    this.formSwitch = !this.formSwitch
  }

  onSignup() {
    if (this.signUpFrom.valid) {
      this.service.signupUser(this.signUpFrom.value).subscribe({
        next: (res) => {
          // console.log("new user added", res)
          this.loggedInUser = res;
          this.authUser.setUser(res.data);
          this.router.navigate(['/profile'])
        },
        error: (err) => {
          console.log("error signing up user", err);
        }
      })
    }

  }

}
