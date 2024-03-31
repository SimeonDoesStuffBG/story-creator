import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { matchPasswordsValidator } from 'src/app/helpers/match-password-validator';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  form:FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(5)]],
    email: ['', [Validators.required]],
    passwordGroup: this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(7)]],
        rePass: ['']
      },
      {
        validators: matchPasswordsValidator('password', 'rePass')
      }
    ),
  });

  get passwordGroup(){
    return this.form.get('passwordGroup');
  }

  constructor(
    private fb: FormBuilder,
    private userService: UserService, 
    private router: Router
     ){}

  register(): void{
    if(this.form.invalid){
      return;
    }

    const {
      username,
      email,
      passwordGroup: { password, rePass }
    } = this.form.value;

    this.userService
      .register(username!, email!, password!, rePass!)
      .subscribe(()=>{
        this.router.navigate(['/login']);
      })
  }
}
