import { NgModule } from "@angular/core";
import { HomeComponent } from "./home/home.component";
import { CommonModule } from "@angular/common";
import { GlobalsModule } from "../components/globals/globals.module";
import { StoryModule } from "../components/story/story.module";
import { StoryCreatorComponent } from './story-creator/story-creator.component';
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations:[HomeComponent, StoryCreatorComponent],
    imports: [CommonModule, GlobalsModule, StoryModule, ReactiveFormsModule],
    exports: [HomeComponent, StoryCreatorComponent]
})
export class PagesModule{}