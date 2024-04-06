import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CharacterRoutingModule } from "./character-router.module";
import { CharacterCreatorComponent } from "./character-creator/character-creator.component";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [CharacterCreatorComponent],
    imports: [RouterModule, CommonModule,ReactiveFormsModule,CharacterRoutingModule],
    exports:[CharacterCreatorComponent]
})
export class CharacterModule{

}