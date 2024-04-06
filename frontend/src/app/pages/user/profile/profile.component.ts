import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserForAuth } from 'src/app/types/user';
import { UserService } from '../user.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
  userId: string = "";
  user = {} as UserForAuth;

  constructor(private userService: UserService ,private activeRoute:ActivatedRoute, private router: Router){
  }

  ngOnInit():void{
    this.activeRoute.params.subscribe((data)=>{
      this.userId = data['userId'];
      
      this.userService.viewUser(this.userId).subscribe((user)=>{
        if(!user._id){
          this.router.navigate(['/']);
        }
        this.user = user;
      })
    
    })

    
  }
}
