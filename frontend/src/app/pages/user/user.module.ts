import { NgModule } from "@angular/core";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

@NgModule({
    declarations: [LoginComponent, RegisterComponent],
    imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterModule],
    exports: [LoginComponent, RegisterComponent]
})
export class UserModule{}