import { NgModule } from "@angular/core";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ProfileComponent } from './profile/profile.component';
import { UserRoutingModule } from "./user-routing.module";

@NgModule({
    declarations: [LoginComponent, RegisterComponent, ProfileComponent],
    imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterModule, UserRoutingModule ],
    exports: [LoginComponent, RegisterComponent]
})
export class UserModule{}