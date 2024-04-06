import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ErrorComponent } from './components/globals/error/error.component';
const routes: Routes = [
  {path:'', pathMatch: 'full', component: HomeComponent},
  {path: 'user', loadChildren: ()=>import('./pages/user/user.module').then((m)=> m.UserModule)},
  {path: 'story', loadChildren: ()=>import('./pages/story/story.module').then(m=>m.StoryModule)},
  {path: 'character', loadChildren: ()=>import('./pages/character/character.module').then(m=>m.CharacterModule)},
  {path: 'error', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
