import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  form:FormGroup = this.fb.group({
    usernameOrEmail: ['', [Validators.required]],
    password: ['', [Validators.required]]
  })

  constructor(private fb: FormBuilder, private userService:UserService, private router: Router){}

  login(): void{
    if(this.form.invalid){
      return;
    }

    const{
      usernameOrEmail,
      password
    } = this.form.value;
    
    this.userService
      .login(usernameOrEmail, password)
      .subscribe(()=>{
        this.router.navigate(['/'])
      })
    }

    ngOnInit(): void {
      if(this.userService.user){
        this.router.navigate(['/']);
      }
    }
}
