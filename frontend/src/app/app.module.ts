import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GlobalsModule } from './components/globals/globals.module';
import { PagesModule } from './pages/pages.module';
import { UserModule } from './pages/user/user.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthComponent } from './auth/auth.component';
import { appInterceptorProvider } from './app.interceptors';
import { StoryModule } from './components/story/story.module';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    GlobalsModule,
    PagesModule,
    UserModule,
    StoryModule
  ],
  providers: [appInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
