import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StoryService } from 'src/app/pages/story/story.service';

@Component({
  selector: 'app-story-creator',
  templateUrl: './story-creator.component.html',
  styleUrls: ['./story-creator.component.scss']
})
export class StoryCreatorComponent implements OnInit{
  get user(){
    return this.userService.user?._id||'';
  }

  isEdit: boolean = false;
  storyId: string = '';
  headerText:string = '';
  btnText:string = ''
  
  form:FormGroup = this.fb.group({
    title:['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
    description:['']
  })
  constructor(
    private userService: UserService, 
    private storyService:StoryService,
    private router: Router,
    private fb:FormBuilder, 
    private activeRoute:ActivatedRoute
  ){}
  
  onSubmit(): void{
    if(this.form.invalid){
      return
    }

    const{
      title,
      description
    } = this.form.value;
    
    if(this.isEdit){
      this.editStory(title, description);
    }
    else{
      this.createStory(title, description);
    }
  }

  createStory(title: string, description:string):void{
    if(this.form.invalid){
      return
    }   

    const creator = this.user;

    this.storyService
      .createStory(title, description, creator)
      .subscribe((story)=>{
        this.router.navigate([`/story/${story._id}`]);
      })
  }

  editStory(title:string, description:string):void{
    if(this.form.invalid){
      return
    }

    this.storyService.editStory(this.storyId, title, description).subscribe((story)=>{
      this.router.navigate([`/story/${story._id}`]);
    });
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(data=>{
      this.storyId = data['storyId'];
      
      if(this.storyId){
        this.storyService.viewStory(this.storyId).subscribe(story=>{
          this.form.setValue({title:story.title, description: story.description});
          this.headerText = 'Edit';
          this.btnText = 'Save Changes';
          this.isEdit = true;
        })
      }
      else{
        this.headerText = 'Create';
          this.btnText = 'Create Story';
      }
    })
    if(this.user===''){
      this.router.navigate(['/login']);
    }
  }
}
