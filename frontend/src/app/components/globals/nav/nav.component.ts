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
  //console.log(this.userService.user)
  return this.userService.user?.name||"";
 }

 constructor(private router:Router, private userService: UserService){}


}
