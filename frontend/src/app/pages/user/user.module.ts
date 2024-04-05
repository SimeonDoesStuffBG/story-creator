import { NgModule } from "@angular/core";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ProfileComponent } from './profile/profile.component';
import { UserRoutingModule } from "./user-routing.module";
import { GlobalsModule } from "src/app/components/globals/globals.module";

@NgModule({
    declarations: [LoginComponent, RegisterComponent, ProfileComponent],
    imports: [ReactiveFormsModule, CommonModule, RouterModule, UserRoutingModule, GlobalsModule],
    exports: [LoginComponent, RegisterComponent]
})
export class UserModule{}