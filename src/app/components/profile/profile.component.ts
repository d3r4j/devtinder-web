import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(private service: LoginService) { }
  @ViewChild('toast') toast!: ElementRef;
  toastSwitch: boolean = false;

  userData: any
  //ng form
  firstName: string = ''
  lastName: string = ''
  age: string = ''
  photoUrl: string = ''
  about: string = ''
  gender: string = ''
  skills: [] = [];

  editError: string = ''

  ngOnInit(): void {

    this.service.fetchUser().subscribe({
      next: (res) => {
        this.userData = res
        console.log(this.userData)
      },
      error: (err) => {
        alert("error fetching user profile" + err)
      }
    })
  }

  onSubmit() {
    // console.log("form submitted", this.userData);
    this.service.userProfileEdit(this.userData).subscribe({
      next: (res) => {
        this.userData = res.data;
        if (this.editError) {
          this.editError = ''
        }
        this.toastSwitch = true;
        setTimeout(() => {
          this.toastSwitch = false;
        }, 3000);
        // console.log("patch response" + res.data)
        // console.log("profile edited" + JSON.stringify(res, null, 2))
      },
      error: (err) => {
        this.editError = JSON.stringify(err.error);
        console.log("error editing profile", this.editError)
      }
    })


  }


}
