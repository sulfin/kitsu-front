import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageEpisodeComponent } from './page-episode/page-episode.component';
import { DisplayEpisodeComponent } from './display-episode/display-episode.component';

@NgModule({
  declarations: [
    AppComponent,
    PageEpisodeComponent,
    DisplayEpisodeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
