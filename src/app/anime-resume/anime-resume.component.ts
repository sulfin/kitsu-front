import {Component, OnInit} from '@angular/core';
import {Anime} from "../anime";
import {SaisonsService} from "../saisons.service";

//const NbAnime = range(0, 30)
@Component({
  selector: 'app-anime-resume',
  templateUrl: './anime-resume.component.html',
  styleUrls: ['./anime-resume.component.css']
})
export class AnimeResumeComponent implements OnInit {

  displayanime: Anime[] = []
  displayfilm:Anime[] = []
  displayTV:Anime[] = []
  displayOAV: Anime[] = []
  displayONA: Anime[] = []
  displaymusic: Anime[] = []
  displayspecial: Anime[] = []
  constructor( private saisonservice: SaisonsService) {
  }

  ngOnInit(): void {

    this.saisonservice.onlistchange().subscribe(

      listeAnime => {this.displayanime=listeAnime

        this.displayTV = this.displayanime.filter(anime => anime.subtype === "TV");
        this.displayfilm = this.displayanime.filter(anime => anime.subtype === "movie");
        this.displayOAV = this.displayanime.filter(anime => anime.subtype === "OVA");
        this.displayONA = this.displayanime.filter(anime => anime.subtype === "ONA");
        this.displaymusic = this.displayanime.filter(anime => anime.subtype === "music");
        this.displayspecial = this.displayanime.filter(anime => anime.subtype === "special");

      }

    )

  }

}
