import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CharacterService } from 'src/app/pages/character/character.service';
import { UserService } from 'src/app/pages/user/user.service';
import { Character } from 'src/app/types/character';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnInit, OnChanges{
  @Input({required:true})forUser: string='';
  characters: Character[]|null = [];

  get canAddChars(): boolean{
    const userIsLoggedIn = this.userService.isLogged;
    const hasUser = this.forUser.length>0;
    const isThisUser = hasUser && this.forUser == this.userService.user?._id;
    return userIsLoggedIn && (!hasUser || isThisUser)
  }

  constructor(private userService:UserService, private characterService:CharacterService){}

  reloadCharacters():void{
    this.characterService.viewCharacters(this.forUser).subscribe(characters=>{
      this.characters = [...characters];
    })
  }

  ngOnInit(): void {
    this.reloadCharacters();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.reloadCharacters();
  }
}
