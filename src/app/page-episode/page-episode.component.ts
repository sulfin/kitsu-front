import { Component, OnInit } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { EpisodeService } from '../episode.service';
import { Episode } from '../episode';

@Component({
  selector: 'app-page-episode',
  templateUrl: './page-episode.component.html',
  styleUrls: ['./page-episode.component.css']
})
export class PageEpisodeComponent implements OnInit {

  displayedEpisodes: Array<Episode> = new Array<Episode>()

  nom : string = '';

  url :string = ' ';

  numeroPage : number =0;
  nbTotalEpisode : number =0;

  firstPage : string = ' ';
  lastPage : string = ' ';

  desactiverBoutonSuiv : string = "disabled";
  desactiverBoutonPrec : string = "disabled";



  constructor(private episodeService: EpisodeService) {
  }

  ngOnInit(): void {

    this.getFirstPage();

  }

  recevoirNomAnime() {

    for(let i=0; i< this.displayedEpisodes.length;i++){

      this.lastPage = this.displayedEpisodes[i].lastPage;

      this.nbTotalEpisode = this.displayedEpisodes[i].nbEpisodeTotal;

      this.episodeService.getnomAnime(this.displayedEpisodes[i].urlAnime).subscribe(
        (x)=> {
          this.displayedEpisodes[i].anime = x
        }
      );

    }
  }

  recevoirImageAnime() {

    for(let i=0; i< this.displayedEpisodes.length;i++){

      if ( this.displayedEpisodes[i].img == null){

        this.episodeService.getImageAnime(this.displayedEpisodes[i].urlAnime).subscribe(
          (x)=> {
            this.displayedEpisodes[i].img = x
          }
        );
      }


    }
  }

  getFirstPage(){

    this.url = this.episodeService.getUrlBase();

      this.episodeService.getEpisodes(this.url).subscribe(
        (x) =>{
          this.displayedEpisodes = x;
          this.recevoirNomAnime();
          this.gestionBouton();
          this.recevoirImageAnime();

        }
      );

      this.firstPage = this.url;

      this.numeroPage=0;

  }

  getLastPage(){

    this.url = this.lastPage;

    console.log("Last page "+ this.url);

      this.episodeService.getEpisodes(this.url).subscribe(
        (x) =>{
          this.displayedEpisodes = x;
          this.recevoirNomAnime();
          this.gestionBouton();
          this.recevoirImageAnime();

        }
      );

      this.numeroPage = Math.floor(this.nbTotalEpisode/10);

  }

  pageSuivante(){

    console.log("Suivante : " +this.displayedEpisodes[0].next + "\nprec : " + this.displayedEpisodes[0].prev )

    if ( this.displayedEpisodes[0].next != null){  //la page suivante existe

      this.url = this.displayedEpisodes[0].next;

      this.episodeService.getEpisodes(this.url).subscribe(
        (x) =>{
          this.displayedEpisodes = x;
          this.recevoirNomAnime();
          this.gestionBouton();
          this.recevoirImageAnime();

        }
      );

      this.numeroPage++;

    }

  }

  pagePrecedente(){

    if ( this.displayedEpisodes[0].prev != null){  //la page precedente existe

      console.log("url page suivante : " + this.displayedEpisodes[this.displayedEpisodes.length -1].next);

      this.url = this.displayedEpisodes[0].prev;

      this.episodeService.getEpisodes(this.url).subscribe(
        (x) =>{
          this.displayedEpisodes = x;
          this.recevoirNomAnime();
          this.gestionBouton();
          this.recevoirImageAnime();

        }
      );

      this.numeroPage--;

    }
  }

  gestionBouton(){
    if (this.displayedEpisodes[this.displayedEpisodes.length -1].next == null){ this.desactiverBoutonSuiv = "disabled";}
    if (this.displayedEpisodes[this.displayedEpisodes.length -1].next != null){ this.desactiverBoutonSuiv = " ";}
    if (this.displayedEpisodes[this.displayedEpisodes.length -1].prev == null){this.desactiverBoutonPrec = "disabled";}
    if (this.displayedEpisodes[this.displayedEpisodes.length -1].prev != null){ this.desactiverBoutonPrec = " ";}
  }


}
