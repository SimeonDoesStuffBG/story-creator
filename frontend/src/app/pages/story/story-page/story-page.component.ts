import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoryService } from 'src/app/pages/story/story.service';
import { Story } from 'src/app/types/story';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-story-page',
  templateUrl: './story-page.component.html',
  styleUrls: ['./story-page.component.scss']
})
export class StoryPageComponent implements OnInit{
  story:Story = {} as Story;
  creator:string="";
  userLink:string="";
  isCreator:boolean=false;

  constructor(private activeRoute:ActivatedRoute, private storyService:StoryService, private userService:UserService){}

  ngOnInit(): void {
    this.activeRoute.params.subscribe(data=>{
      const id = data['storyId'];

      this.storyService.viewStory(id).subscribe((story)=>{
        this.story = story;
        this.userLink = `/user/${story.creator||""}`;
        this.isCreator = this.userService.user?._id === story.creator;

        this.userService.viewUser(this.story.creator||'').subscribe((user)=>{
          this.creator = user.name;
      })
      })

    })
  }
}
