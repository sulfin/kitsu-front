import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DisplayEpisodeComponent } from './display-episode/display-episode.component';
import { NavBarreComponent } from './nav-barre/nav-barre.component';
import { PageAccueilComponent } from './page-accueil/page-accueil.component';
import { PageSortiesComponent } from './page-sorties/page-sorties.component';
import { PageAnimeComponent } from './page-anime/page-anime.component';
import { PageSaisonComponent } from './page-saison/page-saison.component';
import { PageAboutComponent } from './page-about/page-about.component';
import { FooterComponent } from './footer/footer.component';
import { CarouselAccueilComponent } from './carousel-accueil/carousel-accueil.component';
import { CarouselItemComponent } from './carousel-item/carousel-item.component';
import { MenuDeroulantsComponent } from './menu-deroulants/menu-deroulants.component';
import { AnimeResumeComponent } from './anime-resume/anime-resume.component';
import {ReactiveFormsModule} from "@angular/forms";
import { CarteAnimeSaisonComponent } from './carte-anime-saison/carte-anime-saison.component';
import { CategoriesSaisonComponent } from './categories-saison/categories-saison.component';
import { DisplayAnimeComponent } from './display-anime/display-anime.component';

@NgModule({
  declarations: [
    AppComponent,
    DisplayEpisodeComponent,
    NavBarreComponent,
    PageAccueilComponent,
    PageSortiesComponent,
    PageAnimeComponent,
    PageSaisonComponent,
    PageAboutComponent,
    FooterComponent,
    AppComponent,
    CarouselAccueilComponent,
    CarouselItemComponent,
    FooterComponent,
    MenuDeroulantsComponent,
    AnimeResumeComponent,
    CarteAnimeSaisonComponent,
    CategoriesSaisonComponent,
    DisplayAnimeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
