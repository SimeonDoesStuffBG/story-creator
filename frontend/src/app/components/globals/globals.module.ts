import { NgModule } from "@angular/core";
import { NavComponent } from "./nav/nav.component";
import { LoaderComponent } from "./loader/loader.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ErrorComponent } from './error/error.component';
import { StoryListComponent } from "./story-list/story-list.component";
import { StoryThumbnailComponent } from "./story-thumbnail/story-thumbnail.component";
import { ElapsedTimePipe } from "./pipes/elapsed-time.pipe";
import { CharacterListComponent } from './character-list/character-list.component';
import { CharacterThumbnailComponent } from './character-thumbnail/character-thumbnail.component';

@NgModule({
    declarations: [NavComponent, LoaderComponent, ErrorComponent, StoryListComponent, StoryThumbnailComponent, ElapsedTimePipe, CharacterListComponent, CharacterThumbnailComponent],
    imports: [CommonModule, RouterModule],
    exports: [NavComponent, LoaderComponent, ErrorComponent, StoryListComponent, ElapsedTimePipe,CharacterListComponent]
})
export class GlobalsModule{};