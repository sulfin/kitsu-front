import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EpisodeService {

  urlBase = 'https://kitsu.io/api/edge/episodes?sort=-airdate';



  constructor(private httpClient : HttpClient) { }

  getUrlBase(){
    return this.urlBase;
  }


  getEpisodes(url : string)  : Observable<any[]>{
    return this.httpClient.get<any[]>(url).pipe(
       // map( (obj : any) => obj["data"] ),
       // map(( tab : any[] ) => {
        map((obj : any) =>{
          let arr: any =[];
          let tab : any[]= obj["data"];
          tab.forEach(element => {
            let date = new Date(element.airdate);
            let dateActuelle = new Date();
            let image =  element.attributes.thumbnail;
            let url : string = element.relationships.media.links.related

            if ( image !=null){

              if( obj.links.next != undefined && obj.links.prev != undefined  ){  //si les pages suivante et precedente existent
                arr.push({
                  numero : element.number,
                  sortie : date,
                  nom : element.attributes.canonicalTitle,
                  img : image.original,
                  urlAnime : url,
                  anime : ' ',
                  next : obj.links.next,
                  prev : obj.links.prev
                })
              }

              else if (obj.links.next != undefined){ // Si il n y a que next qui existe
                arr.push({
                  numero : element.number,
                  sortie : date,
                  nom : element.attributes.canonicalTitle,
                  img : image.original,
                  urlAnime : url,
                  anime : ' ',
                  next : obj.links.next,
                  prev : null
                })

              }

              else{  //il n y a que prev qui existe
                arr.push({
                  numero : element.number,
                  sortie : date,
                  nom : element.attributes.canonicalTitle,
                  img : image.original,
                  urlAnime : url,
                  anime : ' ',
                  next : null,
                  prev : obj.links.prev
                })


              }

            }
          });

          return arr;
        }
      )
    )
  }

  getnomAnime(url : string) :  Observable<string> {

    return this.httpClient.get<any>(url).pipe(
      map( (obj : any) => {

        let nom = obj["data"].attributes;
        let nomAnime : string = nom.canonicalTitle;
        return nomAnime

      }),
    )

  }
}
