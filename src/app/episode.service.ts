import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable} from 'rxjs';
import { EpisodeRecupere } from './episode-recupere';
import { IncludedEpisode } from './included-episode';
import { Links } from './links';
import { RecupererDataEpisode } from './recuperer-data-episode';

@Injectable({
  providedIn: 'root'
})
export class EpisodeService {

  url = 'https://kitsu.io/api/edge/episodes?sort=-airdate&include=media';

  constructor(private httpClient : HttpClient) { }

  getUrlBase(){
    return this.url;
  }


  getDataEpisode(url : string) : Observable<RecupererDataEpisode> {

    return this.httpClient.get<any[]>(url).pipe(
      map((obj : any) =>{
        let episodeRecupere: RecupererDataEpisode;
        let tabEpisodeRecupere :  Array<EpisodeRecupere> = new Array<EpisodeRecupere>();
        let tabIncluded :  Array<IncludedEpisode> = new Array<IncludedEpisode>();
        let links: Links;

        let tabDataEpisode : any[]= obj["data"];
        let tabDataIncluded : any[] = obj["included"]

        tabDataEpisode.forEach(element => {  //On va parcourir tout le tableau data pour pusher dans notre tableau de EpisodeRecupere

          tabEpisodeRecupere.push({

            idAnime : element.relationships.media.data.id,
            dateSortie : element.attributes.airdate,
            duree : element.attributes.length? element.attributes.length+'\'' : '   ' ,
            numeroEpisode : element.attributes.number,
            numeroSaison : element.attributes.seasonNumber,
            nom : element.attributes.canonicalTitle,
            image : element.attributes.thumbnail? element.attributes.thumbnail.original : null //il peut ne pas y avoir d image pour l episode
          })
        });

        tabDataIncluded.forEach(element => {

          tabIncluded.push({

            id : element.id,
            nom : element.attributes.canonicalTitle,
            type : element.attributes.subtype,
            image : element.attributes.posterImage.original
          })
        });

        links = {
          first : obj.links.first,
          prev : obj.links.prev? obj.links.prev : null,
          next : obj.links.next? obj.links.next : null,
          last : obj.links.last,
          nbTotalEpisode : obj.meta.count
        }

        episodeRecupere = {

          tableauEpisodeRecupere : tabEpisodeRecupere,
          tableauIncluded : tabIncluded,
          links : links
        }

        return episodeRecupere;

      }
    )
  )

  }

}
