import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { StoryPageComponent } from "src/app/pages/story/story-page/story-page.component";
import { StoryCreatorComponent } from "./story-creator/story-creator.component";

const routes: Routes =[
    {path: 'story', children:[
        {path: ':storyId', pathMatch: 'full', component: StoryPageComponent},
        {path: ':storyId/edit', component: StoryCreatorComponent}
    ]}
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StoryRoutingModule{}