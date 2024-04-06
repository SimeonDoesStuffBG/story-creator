import { Component, Input } from '@angular/core';
import { Character } from 'src/app/types/character';

@Component({
  selector: 'app-character-thumbnail',
  templateUrl: './character-thumbnail.component.html',
  styleUrls: ['./character-thumbnail.component.scss']
})
export class CharacterThumbnailComponent {
  @Input({required:true}) character: Character = {} as Character;

  get characterId():string{
    return `/character/${this.character._id}`
  }
}
