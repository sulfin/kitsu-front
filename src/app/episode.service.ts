import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, switchMap, take } from 'rxjs';
import { Episode } from './episode';

@Injectable({
  providedIn: 'root'
})
export class EpisodeService {

  urlBase = 'https://kitsu.io/api/edge/episodes?sort=-airdate';



  constructor(private httpClient : HttpClient) { }

  getUrlBase(){
    return this.urlBase;
  }


  getEpisodes(url : string)  : Observable<Episode[]>{
    return this.httpClient.get<any[]>(url).pipe(
       // map( (obj : any) => obj["data"] ),
       // map(( tab : any[] ) => {
        map((obj : any) =>{
          let arr: any =[];
          let tab : any[]= obj["data"];
          tab.forEach(element => {
            let date : string = element.attributes.airdate;
            let duree : number = element.attributes.length;
            let numeroEpisode : number = element.attributes.number;
            let saison : number = element.attributes.seasonNumber;
            let titre : string = element.attributes.canonicalTitle;
            let image =  element.attributes.thumbnail? element.attributes.thumbnail.original : null;
            let url : string = element.relationships.media.links.related
            let lastPage : string = obj.links.last;
            let nbEpisodeTotal : number = obj.meta.count;

              if( obj.links.next != undefined && obj.links.prev != undefined  ){  //si les pages suivante et precedente existent
                arr.push({
                  duree : duree,
                  numeroEpisode : numeroEpisode,
                  saison : saison,
                  dateSortie : date,
                  titre : titre,
                  img : image,
                  urlAnime : url,
                  anime : ' ',
                  next : obj.links.next,
                  prev : obj.links.prev,
                  lastPage : lastPage,
                  nbEpisodeTotal : nbEpisodeTotal
                })
              }

              else if (obj.links.next != undefined){ // Si il n y a que next qui existe
                arr.push({
                  duree : duree,
                  numeroEpisode : numeroEpisode,
                  saison : saison,
                  dateSortie : date,
                  titre : titre,
                  img : image,
                  urlAnime : url,
                  anime : ' ',
                  next : obj.links.next,
                  prev : null,
                  lastPage : lastPage,
                  nbEpisodeTotal : nbEpisodeTotal
                })

              }

              else{  //il n y a que prev qui existe
                arr.push({
                  duree : duree,
                  numeroEpisode : numeroEpisode,
                  saison : saison,
                  dateSortie : date,
                  titre : titre,
                  img : image,
                  urlAnime : url,
                  anime : ' ',
                  next : null,
                  prev : obj.links.prev,
                  lastPage : lastPage,
                  nbEpisodeTotal : nbEpisodeTotal
                })


              }

            //}
          });

          return arr;
        }
      )
    )
  }

  getnomAnime(url : string) :  Observable<string> {

    return this.httpClient.get<any>(url).pipe(
      map((obj: any) => {

        let nom = obj["data"].attributes;
        let nomAnime: string = nom.canonicalTitle;
        return nomAnime;

      })
    );
  }


  getImageAnime(url : string) :  Observable<string> {

    return this.httpClient.get<any>(url).pipe(
      map((obj: any) => {

        let image : string= obj["data"].attributes.posterImage.original;
        return image;

      })
    );
  }

}
