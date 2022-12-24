import { Component, OnInit } from '@angular/core';
import { EpisodeAffiche } from '../episode-affiche';
import { EpisodeService } from '../episode.service';
import { LinksEpisode } from '../links-episode';
import { RecupererDataEpisode } from '../recuperer-data-episode';

@Component({
  selector: 'app-page-sorties',
  templateUrl: './page-sorties.component.html',
  styleUrls: ['./page-sorties.component.css']
})
export class PageSortiesComponent implements OnInit {

  displayedEpisodes: Array<EpisodeAffiche> = new Array<EpisodeAffiche>();

  dataEpisode! : RecupererDataEpisode;

  links! : LinksEpisode;

  numeroPage : number =0;

  desactiverBoutonSuiv : string = "disabled"; //ira dans la classe bootstrap
  desactiverBoutonPrec : string = "disabled";



  constructor(private episodeService: EpisodeService) {
  }

  ngOnInit(): void {

    this.getFirstPage(); //recupere la 1ere page

  }

  creerEpisodeAffiche(){

    this.displayedEpisodes = new Array<EpisodeAffiche>(); //creer nouveau tableau

    this.links = this.dataEpisode!.links; //on recupere les liens des pages suivantes

    let nomAnime = ' ';
    let type = ' ';
    let image : string| null = ' ';

    for(let i=0; i< this.dataEpisode.tableauEpisodeRecupere.length; i++){

      for(let j=0; j<this.dataEpisode.tableauIncluded.length; j++ ){

        if (this.dataEpisode.tableauIncluded[j].id == this.dataEpisode.tableauEpisodeRecupere[i].idAnime ){  //on a trouve l anime qui correspond a l episode
          nomAnime = this.dataEpisode.tableauIncluded[j].nom;
          type = this.dataEpisode.tableauIncluded[j].type;
          image = this.dataEpisode.tableauEpisodeRecupere[i].image?  this.dataEpisode.tableauEpisodeRecupere[i].image : this.dataEpisode.tableauIncluded[j].image;

        }
      }

      this.displayedEpisodes.push({
        dateSortie : this.dataEpisode.tableauEpisodeRecupere[i].dateSortie,
        duree : this.dataEpisode.tableauEpisodeRecupere[i].duree,
        numeroEpisode : this.dataEpisode.tableauEpisodeRecupere[i].numeroEpisode,
        numeroSaison : this.dataEpisode.tableauEpisodeRecupere[i].numeroSaison,
        nom : this.dataEpisode.tableauEpisodeRecupere[i].nom,
        nomAnime : nomAnime,
        image : image,
        type : type
      })
    }

  }


  getFirstPage(){ //methode pour obtenir la 1ere page

      this.episodeService.getDataEpisode(this.episodeService.getUrlBase()).subscribe(
        (x) =>{
          this.dataEpisode = x;
          this.creerEpisodeAffiche();
          this.gestionBouton();

        }
      );

      this.numeroPage=0;

  }

  getLastPage(){

      this.episodeService.getDataEpisode(this.links.last).subscribe(
        (x) =>{
          this.dataEpisode = x;
          this.creerEpisodeAffiche();
          this.gestionBouton();

        }
      );

      this.numeroPage = Math.floor(this.links.nbTotalEpisode/10);

  }

  pageSuivante(){

    if ( this.links.next != null){  //la page suivante existe

      this.episodeService.getDataEpisode(this.links.next).subscribe(
        (x) =>{
          this.dataEpisode = x;
          this.creerEpisodeAffiche();
          this.gestionBouton();

        }
      );

      this.numeroPage++;

    }

  }

  pagePrecedente(){

    if (  this.links.prev != null){  //la page precedente existe

      this.episodeService.getDataEpisode(this.links.prev).subscribe(
        (x) =>{
          this.dataEpisode = x;
          this.creerEpisodeAffiche();
          this.gestionBouton();

        }
      );

      this.numeroPage--;

    }
  }

  gestionBouton(){


    if ( this.links.next == null){ this.desactiverBoutonSuiv = "disabled";}
    if ( this.links.next != null){ this.desactiverBoutonSuiv = " ";}
    if ( this.links.prev == null){this.desactiverBoutonPrec = "disabled";}
    if ( this.links.prev != null){ this.desactiverBoutonPrec = " ";}
  }
}
