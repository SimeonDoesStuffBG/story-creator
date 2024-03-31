import { Component, OnInit } from '@angular/core';
import { UserService } from '../pages/user/user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit{
  isAuthenticating = true;

  constructor(private userService: UserService){}

  ngOnInit(): void {
    this.userService.getProfile().subscribe({
      next: ()=>{
        this.isAuthenticating = false;
      },
      error: ()=>{
        this.isAuthenticating = false;
      },
      complete:()=>{
        this.isAuthenticating = false;
      }


    })
  }
}
