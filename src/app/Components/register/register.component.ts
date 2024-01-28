import { Component } from '@angular/core';
import { ApiService } from '../../Services/Api.service';
import { IRegisterUser } from '../../DataTypes/user';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
user!:IRegisterUser
form: FormGroup; 



constructor(private AuthApiServ:ApiService,private router:Router){

  this. form = new FormGroup({
    name :new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)]),
    phoneNumber:new FormControl('',[Validators.required,Validators.pattern(/^(\+201|01|00201)[0-2,5]{1}[0-9]{8}/)]),
    email: new FormControl('', [Validators.required, Validators.pattern(/^\S+@\S+\.\S+$/)]),
  });
  
}
  send() {
    
    this.AuthApiServ.Register(this.form.value).subscribe({
      next:(responce)=>{
        if (responce.success == true) {
          alert(responce.message)
          this.router.navigateByUrl("/login")
        } else {
          alert(responce.message)
        }
      }
    })
  }
}
