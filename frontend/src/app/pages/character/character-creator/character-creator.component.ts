import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CharacterService } from '../character.service';

@Component({
  selector: 'app-character-creator',
  templateUrl: './character-creator.component.html',
  styleUrls: ['./character-creator.component.scss']
})
export class CharacterCreatorComponent implements OnInit{
  
  form: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    description: ['']
  })

  constructor(private activeRoute:ActivatedRoute, private characterService:CharacterService, private router:Router, private fb:FormBuilder){}

  onSubmit():void{
    if(this.form.invalid){
      return
    }

    const {name, description} = this.form.value;

    this.createCharacter(name,description);
  }

  createCharacter(name: string, description: string):void{
    if(this.form.invalid){
      return
    }

    this.characterService.createCharacter(name,description).subscribe((character)=>this.router.navigate(['/']));
  }

  ngOnInit():void{
    // this.activeRoute.params.subscribe((data)=>{
    //   console.log(data['charId']);
    // })
  }
}
