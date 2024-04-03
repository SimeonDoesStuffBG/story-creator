import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserForAuth } from 'src/app/types/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
  user = {} as UserForAuth;

  constructor(private userService: UserService ,private activeRoute:ActivatedRoute){}

  ngOnInit():void{
    this.activeRoute.params.subscribe((data)=>{
      const id = data['userId'];
      
      this.userService.getUser(id).subscribe((user)=>{
        this.user = user;
      })
    })
  }
}
