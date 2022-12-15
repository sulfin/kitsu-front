import { Component, OnInit } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { EpisodeService } from '../episode.service';

@Component({
  selector: 'app-sorties',
  templateUrl: './sorties.component.html',
  styleUrls: ['./sorties.component.css']
})
export class SortiesComponent implements OnInit {

  displayedEpisodes: Array<any> = new Array<any>()

  nom : string = '';

  url :string = ' ';

  constructor(private episodeService: EpisodeService) {
  }

  ngOnInit(): void {

    this.url = this.episodeService.getUrlBase();
    this.episodeService.getEpisodes(this.url).subscribe(
      (x) =>{
        this.displayedEpisodes = x;
        this.recevoirNomAnime();

      }
    );

  }

  recevoirNomAnime() {

    for(let i=0; i< this.displayedEpisodes.length;i++){

      this.episodeService.getnomAnime(this.displayedEpisodes[i].urlAnime).subscribe(
        (x)=> {
          this.displayedEpisodes[i].anime = x
        }
      );

    }
  }

  pageSuivante(){

    console.log("Suivante : " +this.displayedEpisodes[0].next + "\nprec : " + this.displayedEpisodes[0].prev )

    if ( this.displayedEpisodes[0].next != null){  //la page suivante existe

      this.url = this.displayedEpisodes[0].next;

      this.episodeService.getEpisodes(this.url).subscribe(
        (x) =>{
          this.displayedEpisodes = x;
          this.recevoirNomAnime();

        }
      );

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

        }
      );

    }


  }


}



