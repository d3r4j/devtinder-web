import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  constructor(private service: LoginService, private router: Router, private authUser: AuthUserService) { }



  emailId = new FormControl('dhiraj@gmail.com', [Validators.required]);
  password = new FormControl('Dhiraj@12345', Validators.required);

  loginForm = new FormGroup({
    emailId: this.emailId,
    password: this.password
  })

  loginError: string = ''
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

}
