import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/pages/user/user.service';
import { Story } from 'src/app/types/story';

@Component({
  selector: 'app-story-thumbnail',
  templateUrl: './story-thumbnail.component.html',
  styleUrls: ['./story-thumbnail.component.scss']
})
export class StoryThumbnailComponent implements OnInit {
  @Input({required:true}) story!: Story;
  creator:string="";
  storyId:string="";
  constructor(private userService:UserService){}

  ngOnInit(): void {
     this.userService.viewUser(this.story?.creator||"").subscribe(user=>{
      this.creator = user.name;
     });
     this.storyId = `/story/${this.story?._id}`
  }
}
