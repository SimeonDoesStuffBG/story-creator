import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { UserModule } from "src/app/pages/user/user.module";
import { StoryRoutingModule } from "./story-router.module";
import { StoryPageComponent } from "./story-page/story-page.component";
import { StoryCreatorComponent } from "./story-creator/story-creator.component";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations: [StoryPageComponent, StoryCreatorComponent],
    imports: [CommonModule, RouterModule, UserModule, StoryRoutingModule, ReactiveFormsModule],
    exports: [StoryPageComponent, StoryCreatorComponent]
})
export class StoryModule{}