import { NgModule } from "@angular/core";
import { HomeComponent } from "./home/home.component";
import { CommonModule } from "@angular/common";
import { GlobalsModule } from "../components/globals/globals.module";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

@NgModule({
    declarations:[HomeComponent],
    imports: [CommonModule, GlobalsModule, ReactiveFormsModule, RouterModule],
    exports: [HomeComponent]
})
export class PagesModule{}