import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarreComponent } from './nav-barre/nav-barre.component';
import { PageAccueilComponent } from './page-accueil/page-accueil.component';
import { PageSortiesComponent } from './page-sorties/page-sorties.component';
import { PageAnimeComponent } from './page-anime/page-anime.component';
import { PagePersonnagesComponent } from './page-personnages/page-personnages.component';
import { PageSaisonComponent } from './page-saison/page-saison.component';
import { PageAboutComponent } from './page-about/page-about.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarreComponent,
    PageAccueilComponent,
    PageSortiesComponent,
    PageAnimeComponent,
    PagePersonnagesComponent,
    PageSaisonComponent,
    PageAboutComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
