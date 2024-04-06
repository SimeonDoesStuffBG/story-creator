import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CharacterRoutingModule } from "./character-router.module";
import { CharacterCreatorComponent } from "./character-creator/character-creator.component";
import { CommonModule } from "@angular/common";
import { CharacterPageComponent } from "./character-page/character-page.component";

@NgModule({
    declarations: [CharacterCreatorComponent, CharacterPageComponent],
    imports: [RouterModule, CommonModule, ReactiveFormsModule, CharacterRoutingModule],
    exports:[CharacterCreatorComponent, CharacterPageComponent]
})
export class CharacterModule{

}