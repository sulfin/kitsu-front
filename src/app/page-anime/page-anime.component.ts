import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Anime } from '../anime';
import { AnimeService } from '../anime.service';
import { Links } from '../links';
import { RecupererDataAnime } from '../recuperer-data-anime';

@Component({
  selector: 'app-page-anime',
  templateUrl: './page-anime.component.html',
  styleUrls: ['./page-anime.component.css']
})
export class PageAnimeComponent implements OnInit {

  displayedAnime: Array<Anime> = new Array<Anime>();

  dataAnimeRecupere! : RecupererDataAnime;

  links! : Links;

  numeroPage : number =0;

  optionRechercherNom : string = ' ';

  desactiverBoutonSuiv : string = "disabled"; //ira dans la classe bootstrap
  desactiverBoutonPrec : string = "disabled";

  searchForm: UntypedFormGroup
  animeNameCtrl: FormControl

  constructor(private animeService: AnimeService, private fb: FormBuilder) {
    this.animeNameCtrl = new FormControl('')
    this.searchForm = new UntypedFormGroup({
        animeName: this.animeNameCtrl
    })
  }

  ngOnInit(): void {

    this.animeNameCtrl= this.fb.control('', [Validators.required, Validators.minLength(3)]);
    this.searchForm = new UntypedFormGroup({ animeName: this.animeNameCtrl})


    this.getFirstPage(this.optionRechercherNom);
  }


  getFirstPage(option : string){ //methode pour obtenir la 1ere page

    this.animeService.getFullAnimes(this.animeService.animeURL , option).subscribe(
      (x) =>{
        this.dataAnimeRecupere = x;
        this.displayedAnime = x.tableauAnimeRecupere;
        this.links = x.links;
        this.gestionBouton();

      }
    );

    this.numeroPage=0;

}

  getLastPage(){

    this.animeService.getFullAnimes(this.links.last, ' ').subscribe(
      (x) =>{
        this.dataAnimeRecupere = x;
        this.displayedAnime = x.tableauAnimeRecupere;
        this.links = x.links;
        this.gestionBouton();

      }
    );

    this.numeroPage = Math.floor(this.links.nbTotalEpisode/10);

  }

  pageSuivante(){

  if ( this.links.next != null){  //la page suivante existe

    this.animeService.getFullAnimes(this.links.next, ' ').subscribe(
      (x) =>{
        this.dataAnimeRecupere = x;
        this.displayedAnime = x.tableauAnimeRecupere;
        this.links = x.links;
        this.gestionBouton();

      }
    );

    this.numeroPage++;

  }

  }

  pagePrecedente(){

  if (  this.links.prev != null){  //la page precedente existe

    this.animeService.getFullAnimes(this.links.prev, ' ').subscribe(
      (x) =>{
        this.dataAnimeRecupere = x;
        this.displayedAnime = x.tableauAnimeRecupere;
        this.links = x.links;
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

  submit() {

    this.optionRechercherNom = "?filter[text]="+this.animeNameCtrl.value;

    this.getFirstPage(this.optionRechercherNom);

    console.log("url option : " + this.optionRechercherNom);

}


}
