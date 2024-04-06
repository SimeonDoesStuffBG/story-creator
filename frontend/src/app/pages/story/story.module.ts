import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { StoryRoutingModule } from "./story-router.module";
import { StoryPageComponent } from "./story-page/story-page.component";
import { StoryCreatorComponent } from "./story-creator/story-creator.component";
import { ReactiveFormsModule } from "@angular/forms";
import { GlobalsModule } from "src/app/components/globals/globals.module";

@NgModule({
    declarations: [StoryPageComponent, StoryCreatorComponent],
    imports: [CommonModule, GlobalsModule, RouterModule, StoryRoutingModule, ReactiveFormsModule],
    exports: [StoryPageComponent, StoryCreatorComponent]
})
export class StoryModule{}