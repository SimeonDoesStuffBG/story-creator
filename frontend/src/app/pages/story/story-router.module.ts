import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { StoryPageComponent } from "src/app/pages/story/story-page/story-page.component";
import { StoryCreatorComponent } from "./story-creator/story-creator.component";

const routes: Routes =[
    {path: 'create', component: StoryCreatorComponent},
    {path: ':storyId/edit', component: StoryCreatorComponent},
    {path: ':storyId', /*pathMatch: 'full',*/ component: StoryPageComponent},
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StoryRoutingModule{}