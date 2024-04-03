import { NgModule } from "@angular/core";
import { StoryListComponent } from "./story-list/story-list.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { UserModule } from "src/app/pages/user/user.module";
import { StoryThumbnailComponent } from './story-thumbnail/story-thumbnail.component';

@NgModule({
    declarations: [StoryListComponent, StoryThumbnailComponent],
    imports: [CommonModule, RouterModule, UserModule],
    exports: [StoryListComponent]
})
export class StoryModule{}