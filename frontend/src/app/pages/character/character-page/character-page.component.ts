import { Component, OnInit } from '@angular/core';
import { CharacterService } from '../character.service';
import { ActivatedRoute } from '@angular/router';
import { Character } from 'src/app/types/character';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-character-page',
  templateUrl: './character-page.component.html',
  styleUrls: ['./character-page.component.scss']
})
export class CharacterPageComponent implements OnInit{
  characterId: string = '';
  character: Character = {} as Character;
  canEdit: boolean = false;
  constructor(private characterService: CharacterService, private activeRoute: ActivatedRoute, private userService: UserService){}

  ngOnInit(): void {
    this.activeRoute.params.subscribe((data)=>{
      this.characterId = data['charId'];

      this.characterService.viewCharacter(this.characterId).subscribe(char=>{
        this.character = char;
      })

      
      this.canEdit = this.userService.user?._id === this.characterId
    })
  }
}
