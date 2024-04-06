import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CharacterCreatorComponent } from "./character-creator/character-creator.component";
import { CharacterPageComponent } from "./character-page/character-page.component";

const routes: Routes = [
    {path: 'create', component: CharacterCreatorComponent},
    {path: ':charId/edit', component: CharacterCreatorComponent},
    {path: ':charId', component: CharacterPageComponent}
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CharacterRoutingModule{}