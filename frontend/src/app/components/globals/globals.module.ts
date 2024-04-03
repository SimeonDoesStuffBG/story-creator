import { NgModule } from "@angular/core";
import { NavComponent } from "./nav/nav.component";
import { LoaderComponent } from "./loader/loader.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ErrorComponent } from './error/error.component';

@NgModule({
    declarations: [NavComponent, LoaderComponent, ErrorComponent],
    imports: [CommonModule, RouterModule],
    exports: [NavComponent, LoaderComponent, ErrorComponent]
})
export class GlobalsModule{};