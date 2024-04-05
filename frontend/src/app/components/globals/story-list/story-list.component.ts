import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/pages/user/user.service';
import { StoryService } from '../../../pages/story/story.service';
import { Story } from 'src/app/types/story';

@Component({
  selector: 'app-story-list',
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.scss']
})
export class StoryListComponent implements OnInit, OnChanges{
  @Input() forUser:string='';
  stories: Story[] | null = [];

  get canAddStory():boolean{
    const userIsLoggedIn = this.userService.isLogged;
    const hasUser = this.forUser.length>0;
    const isThisUser = hasUser && this.forUser == this.userService.user?._id;
   return userIsLoggedIn && (!hasUser || isThisUser);
  }

  constructor(private userService:UserService, private storyService:StoryService){}
  
  reloadStories(): void{
    this.storyService.viewStories(this.forUser).subscribe(stories=>{
      const tempStories = stories;

      this.stories = [...tempStories];
    })
  }

  ngOnInit(): void {
    this.reloadStories();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.reloadStories();
  }
  
}
