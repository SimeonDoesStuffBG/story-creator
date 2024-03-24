import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { GlobalsModule } from "./Globals/globals.module";
import { RouterModule } from "@angular/router";
import { routes } from "./app.routes";

@NgModule({
    declarations:
    [
        AppComponent
    ],
    imports: [
        GlobalsModule,
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppModule{}