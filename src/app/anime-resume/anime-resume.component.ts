import {Component, OnInit} from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import {Anime} from "../anime";
import { AnimeService } from '../anime.service';
import { Links } from '../links';
import { RecupererDataAnime } from '../recuperer-data-anime';
import {SaisonsService} from "../saisons.service";

//const NbAnime = range(0, 30)
@Component({
  selector: 'app-anime-resume',
  templateUrl: './anime-resume.component.html',
  styleUrls: ['./anime-resume.component.css']
})
export class AnimeResumeComponent implements OnInit {

  animeRecupere! : RecupererDataAnime;

  links! : Links;

  displayanime: Anime[] = []
  displayfilm:Anime[] = []
  displayTV:Anime[] = []
  displayOAV: Anime[] = []
  displayONA: Anime[] = []
  displaymusic: Anime[] = []
  displayspecial: Anime[] = []
  constructor( private saisonservice: SaisonsService, private animeService : AnimeService) {
  }

  ngOnInit(): void {

    this.saisonservice.onlistchange().subscribe(

      listeAnime => {this.animeRecupere=listeAnime

        this.displayanime = this.animeRecupere.tableauAnimeRecupere;

        this.links = this.animeRecupere.links;

        this.appelRecursif();


    })
  }

  appelRecursif(){

    if(this.links.next != null){  //tant que l on est pas arrive a la derniere page
      let observable = this.animeService.getFullAnimes(this.links.next, ' ');

      forkJoin([observable]).subscribe(anime => { //on attend que la souscription soit finie
        this.links = anime[0].links;

        for(let i=0;i<anime[0].tableauAnimeRecupere.length;i++){  //on vient completer la liste des animes
          this.displayanime.push(anime[0].tableauAnimeRecupere[i]);
        }

        this.displayTV = this.displayanime.filter(anime => anime.subtype === "TV");  //on met a jour au fur et a mesure pour faire une impression de progression
        this.displayfilm = this.displayanime.filter(anime => anime.subtype === "movie");
        this.displayOAV = this.displayanime.filter(anime => anime.subtype === "OVA");
        this.displayONA = this.displayanime.filter(anime => anime.subtype === "ONA");
        this.displaymusic = this.displayanime.filter(anime => anime.subtype === "music");
        this.displayspecial = this.displayanime.filter(anime => anime.subtype === "special");

        this.appelRecursif();  //On rappel la methode
      }
    )

    }


  }
}
