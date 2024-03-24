import { Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/register/register.component';

export const routes: Routes = [
    {path:'', pathMatch: 'full', component: HomeComponent},
    {path:'login', component:LoginComponent},
    {path:'register', component:RegisterComponent}
];
