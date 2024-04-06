import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CharacterService } from '../character.service';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-character-creator',
  templateUrl: './character-creator.component.html',
  styleUrls: ['./character-creator.component.scss']
})
export class CharacterCreatorComponent implements OnInit{
  charId: string = "";
  headerTxt:string = "Create character"
  btnText:string = "Create character"
  isEdit:boolean = false;
  
  form: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    description: ['']
  })

  constructor(private activeRoute:ActivatedRoute, private characterService:CharacterService, private router:Router, private fb:FormBuilder, private userService: UserService){}

  onSubmit():void{
    if(this.form.invalid){
      return
    }

    const {name, description} = this.form.value;

    if(this.isEdit){
      this.editCharacter(this.charId, name, description);
    }else{
      this.createCharacter(name,description);  
    }
  }
  private createCharacter(name: string, description: string):void{
    if(this.form.invalid){
      return
    }
    
    this.characterService.createCharacter(name,description).subscribe((character)=>this.router.navigate(['/']));
  }

  private editCharacter(charId:string, name:string, description: string):void{
    if(this.form.invalid){
      return
    }

    this.characterService.editCharacter(charId, name, description)
  }

  ngOnInit():void{
    if(!this.userService.isLogged){
      this.router.navigate(['/']);
    }

    this.activeRoute.params.subscribe((data)=>{
      this.charId = data['charId'];

      if(this.charId.length>0){
        this.headerTxt = "Edit character"
        this.btnText = "Save changes"
        this.isEdit = true;

        this.characterService.viewCharacter(this.charId).subscribe((char)=>{
          this.form.setValue({name:char.name, description: char.description});
        })
      }
    })
  }
}
