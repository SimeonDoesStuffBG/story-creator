import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StoryService } from 'src/app/components/story/story.service';

@Component({
  selector: 'app-story-creator',
  templateUrl: './story-creator.component.html',
  styleUrls: ['./story-creator.component.scss']
})
export class StoryCreatorComponent implements OnInit{
  get user(){
    return this.userService.user?._id||'';
  }
  
  form:FormGroup = this.fb.group({
    title:['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
    description:['']
  })
  constructor(private userService: UserService, private storyService:StoryService, private router: Router, private fb:FormBuilder){}
  
  createStory():void{
    if(this.form.invalid){
      return
    }

    const{
      title,
      description
    } = this.form.value;

    const creator = this.user;

    this.storyService
      .createStory(title, description, creator)
      .subscribe(()=>{
        this.router.navigate(['/']);
      })

    console.log("story");
  }

  ngOnInit(): void {
    if(this.user===''){
      this.router.navigate(['/login']);
    }
  }
}
