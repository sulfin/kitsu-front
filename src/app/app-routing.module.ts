import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PageAccueilComponent} from "./page-accueil/page-accueil.component";
import {PageSortiesComponent} from "./page-sorties/page-sorties.component";
import {PageAnimeComponent} from "./page-anime/page-anime.component";
import {PagePersonnagesComponent} from "./page-personnages/page-personnages.component";
import {PageSaisonComponent} from "./page-saison/page-saison.component";
import {PageAboutComponent} from "./page-about/page-about.component";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/accueil' },
  { path: 'accueil', component: PageAccueilComponent },
  { path: 'sorties', component: PageSortiesComponent },
  { path: 'anime', component: PageAnimeComponent },
  { path: 'personnages', component: PagePersonnagesComponent },
  { path: 'saisons', component: PageSaisonComponent },
  { path: 'about', component: PageAboutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
