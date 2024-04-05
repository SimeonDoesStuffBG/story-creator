import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/user/login/login.component';
import { RegisterComponent } from './pages/user/register/register.component';
import { ErrorComponent } from './components/globals/error/error.component';
import { StoryCreatorComponent } from './pages/story/story-creator/story-creator.component';

const routes: Routes = [
  {path:'', pathMatch: 'full', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'user', loadChildren: ()=>import('../app/pages/user/user.module').then((m)=>m.UserModule)},
  {path: 'story', loadChildren: ()=>import('../app/pages/story/story.module').then(m=>m.StoryModule)},
  {path: 'story-creator', component: StoryCreatorComponent},
  {path: 'error', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
