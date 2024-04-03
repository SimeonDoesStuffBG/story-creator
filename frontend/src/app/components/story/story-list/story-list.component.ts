import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/pages/user/user.service';
import { StoryService } from '../story.service';
import { Story } from 'src/app/types/story';

@Component({
  selector: 'app-story-list',
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.scss']
})
export class StoryListComponent implements OnInit{
  stories: Story[] | null = [];
  get userIsLogged(){
   return this.userService.isLogged;
  }

  
  constructor(private userService:UserService, private storyService:StoryService){}

  ngOnInit(): void {
    this.storyService.viewStories().subscribe(stories=>{
      const tempStories = stories;

      this.stories = [...tempStories];
    })
  }
}
