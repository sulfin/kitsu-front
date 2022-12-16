import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarouselAccueilComponent } from './carousel-accueil/carousel-accueil.component';
import { CarouselItemComponent } from './carousel-item/carousel-item.component';

@NgModule({
  declarations: [
    AppComponent,
    CarouselAccueilComponent,
    CarouselItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
