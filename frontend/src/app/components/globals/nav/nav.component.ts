import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/pages/user/user.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
 get userLoggedIn(): boolean{
  return this.userService.isLogged;
 }

 get username():string{
  return this.userService.user?.name||"";
 }

 get userId(): string{
  let userId = this.userService.user?._id||""
  return `/user/${userId}`;
 }

 constructor(private router:Router, private userService: UserService){}


}
