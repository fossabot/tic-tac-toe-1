import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ContentLayoutComponent } from './layout/content/content.component';
import { AuthLayoutComponent } from './layout/auth/auth.component';
import { NavigationBarComponent } from './layout/navigation-bar/navigation-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    ContentLayoutComponent,
    AuthLayoutComponent,
    NavigationBarComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
  ],
  providers: [Title],
  bootstrap: [AppComponent],
})
export class AppModule {}
