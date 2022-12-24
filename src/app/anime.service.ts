import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Anime} from "./anime";

@Injectable({
  providedIn: 'root'
})
export class AnimeService {

  baseURL = "https://kitsu.io/api/edge/anime/"


  constructor(private httpClient: HttpClient) {
  }

  getAnimes(option: string): Observable<any> {
    return this.httpClient.get(this.baseURL + option)
  }

  getAnimeSaison(saison: string, annee: string): Observable<Anime[]> {
    return this.getAnimes(`?filter[season]=${saison}&filter[seasonYear]=${annee}`).pipe(
      map<any, Anime[]>((data) => { return data.map((val: any) => this.anyToAnime(val))})
    )
  }

  anyToAnime(data: any): Anime {

    return {
      canonicalTitle: data.attributes.canonicalTitle,
      coverImage: data.attributes.coverImage?.original,
      description: data.attributes.description,
      endDate: data.attributes.endDate,
      episodeCount: data.attributes.episodeCount,
      episodeLength: data.attributes.episodeLength,
      id: data.id,
      posterImage: data.attributes.posterImage?.original,
      startDate: data.attributes.startDate,
      status: data.attributes.status,
      subtype: data.attributes.subtype,
      titles: {
        en_jp: data.attributes.titles.en_jp,
        en_us: data.attributes.titles.en_us,
        ja_jp: data.attributes.titles.ja_jp,
      },
      youtubeVideoId: data.attributes.youtubeVideoId,
      relationships: null,
    }
  }

}
