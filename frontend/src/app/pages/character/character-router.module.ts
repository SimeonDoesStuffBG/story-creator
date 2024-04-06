import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CharacterCreatorComponent } from "./character-creator/character-creator.component";

const routes: Routes = [
    {path: 'create', component: CharacterCreatorComponent},
    //{path: ':charId/edit'},
    //{path: ':charId'}
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CharacterRoutingModule{}