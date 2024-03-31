import { NgModule } from "@angular/core";
import { HomeComponent } from "./home/home.component";
import { CommonModule } from "@angular/common";
import { GlobalsModule } from "../components/globals.module";

@NgModule({
    declarations:[HomeComponent],
    imports: [CommonModule, GlobalsModule],
    exports: [HomeComponent]
})
export class PagesModule{}