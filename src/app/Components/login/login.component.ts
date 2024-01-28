import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ILoginUser, IStoredUser } from '../../DataTypes/user';
import { ApiService } from '../../Services/Api.service';
import { AuthService } from '../../Services/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user!: ILoginUser
  form: FormGroup;
  constructor(private builder: FormBuilder, private apiServ: ApiService,private router:Router,private authServ:AuthService) {

    ///get one

   this. form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(/^\S+@\S+\.\S+$/)]),
      password: new FormControl("", [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)]),
    });
}
send() {
  
  this.apiServ.Login(this.form.value).subscribe({
    next: (responce) => {
      console.log(responce);
      if(responce.success){
        alert(responce.message)
        this.form.reset();
        let data : IStoredUser = {
          token : responce.data.token,
          name : responce.data.user.name,
          email : responce.data.user.email,
          phoneNumber : responce.data.user.phoneNumber,
        }
        this.authServ.newUserLoggedIn(data)
          this.router.navigateByUrl("/home")
      }
      else{
        alert(responce.message)
      }

    },
    error: (err) => {
      console.log(err);

    }
  })
}
}