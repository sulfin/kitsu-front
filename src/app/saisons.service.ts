import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, Subject, switchMap} from "rxjs";
import {AnimeService} from "./anime.service";
import { RecupererDataAnime } from './recuperer-data-anime';


@Injectable({
  providedIn: 'root'
})



export class SaisonsService {

  protected queue_anime: BehaviorSubject<string> = new BehaviorSubject<string>('valeur')
  protected sujet_anime_saison: Subject<RecupererDataAnime> = new Subject<RecupererDataAnime>()


  constructor(private http: HttpClient,
              private animeservice: AnimeService) { }

  donnee_reception(): Observable<string>{
    return this.queue_anime.asObservable()
  }

  donnee_envoie(descripteur: string){
    this.queue_anime.next(descripteur)
  }

  changesaison(saison: string , annee: number) {
    this.animeservice.getAnimeSaison(saison, annee.toString()).subscribe(
      data => {
        this.sujet_anime_saison.next(data)
        console.log(data)
      }
    )}

  onlistchange(): Observable<RecupererDataAnime>{
    return this.sujet_anime_saison.asObservable()
  }





}
