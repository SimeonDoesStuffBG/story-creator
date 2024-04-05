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
  userId: string = "";
  user = {} as UserForAuth;

  constructor(private userService: UserService ,private activeRoute:ActivatedRoute){
  }

  ngOnInit():void{
    this.activeRoute.params.subscribe((data)=>{
      this.userId = data['userId'];
      
      this.userService.viewUser(this.userId).subscribe((user)=>{
        this.user = user;
      })
    })

    
  }
}
