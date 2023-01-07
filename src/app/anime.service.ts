import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Anime} from "./anime";
import {AnimeDetail} from "./anime-detail";
import { RecupererDataAnime } from './recuperer-data-anime';
import { Links } from './links';

@Injectable({
  providedIn: 'root'
})
export class AnimeService {

  animeURL = "https://kitsu.io/api/edge/anime/"
  trendingURL = "https://kitsu.io/api/edge/trending/anime"


  constructor(private httpClient: HttpClient) {
  }

  getFullAnimes(url: string, option: string): Observable<RecupererDataAnime> {
    return this.httpClient.get<RecupererDataAnime>(url + option).pipe(
      map((obj : any) =>{

        let AnimeRecupere : RecupererDataAnime;
        let tabAnimeRecupere :  Array<Anime> = new Array<Anime>();
        let links: Links;

        let tabDataAnime : any[]= obj["data"];

        tabDataAnime.forEach(element => {  //On va parcourir tout le tableau data pour pusher dans notre tableau de tabAnimeRecupere

          tabAnimeRecupere.push(this.anyToAnime(element))

      }
    );

    links = {               //Pour avoir les liens des pages suivantes, precedentes
      first : obj.links.first,
      prev : obj.links.prev? obj.links.prev : null,
      next : obj.links.next? obj.links.next : null,
      last : obj.links.last,
      nbTotalEpisode : obj.meta.count
    };

    AnimeRecupere = {  //Creation de l'objet qui contient la liste des animés ainsi que les meta donnees comme page suivante de l'api

      tableauAnimeRecupere : tabAnimeRecupere,
      links : links
    }

    return AnimeRecupere;
  }
  )
  )
  }

  getAnimes(url: string, option: string): Observable<any> {
    return this.httpClient.get(url + option)
  }

  getAnimeSaison(saison: string, annee: string): Observable<RecupererDataAnime> {
    return this.getAnimes(this.animeURL, `?filter[season]=${saison}&filter[seasonYear]=${annee}`).pipe(
      map((obj : any) =>{

        let AnimeRecupere : RecupererDataAnime;
        let tabAnimeRecupere :  Array<Anime> = new Array<Anime>();
        let links: Links;

        let tabDataAnime : any[]= obj["data"];

        tabDataAnime.forEach(element => {  //On va parcourir tout le tableau data pour pusher dans notre tableau de tabAnimeRecupere

          tabAnimeRecupere.push(this.anyToAnime(element))

      }
    );

    links = {               //Pour avoir les liens des pages suivantes, precedentes
      first : obj.links.first,
      prev : obj.links.prev? obj.links.prev : null,
      next : obj.links.next? obj.links.next : null,
      last : obj.links.last,
      nbTotalEpisode : obj.meta.count
    };

    AnimeRecupere = {  //Creation de l'objet qui contient la liste des animés ainsi que les meta donnees comme page suivante de l'api

      tableauAnimeRecupere : tabAnimeRecupere,
      links : links
    }

    return AnimeRecupere;
  }
  )
  )
  }

  getAnimePopulaire(): Observable<Anime[]> {
    return this.getAnimes(this.trendingURL, "").pipe(
      map<any, Anime[]>((data) => {
        return data.data.map((val: any) => this.anyToAnime(val))
      })
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
      relationships: data.relationships,
    }
  }

  getAnimeDetail(id: string): Observable<AnimeDetail> {
    return this.httpClient.get(`${this.animeURL}/${id}?include=categories,characters.character,episodes`).pipe(
      map((data: any) => {
        let anime = this.anyToAnime(data.data)
        return {
          anime: anime,
          categories: anime.relationships.categories.data.map((cat: any) => {
            // recupération de la catégorie dans les included
            return data.included.find((incl: any) => incl.type === cat.type && incl.id === cat.id).attributes.title
          }),
          personnages: anime.relationships.characters.data.map((mchar: any) => {
            let mediaCharacter = data.included.find((incl: any) => incl.type === mchar.type && incl.id === mchar.id)
            let char = mediaCharacter.relationships.character.data
            let character = data.included.find((incl: any) => incl.type === char.type && incl.id === char.id)
            return {
              role: mediaCharacter.attributes.role,
              nom: character.attributes.canonicalName,
              image: {
                original: character.attributes.image.original,
                medium: character.attributes.image.medium,
                small: character.attributes.image.small
              }
            }
          }),
          episodes: anime.relationships.episodes.data.map((ep: any) => {
            let episode = data.included.find((incl: any) => incl.type === ep.type && incl.id === ep.id)
            return {
              num: episode.attributes.number,
              id: ep.id,
              titre: episode.attributes.canonicalTitle,
            }
          })
        }
      })
    )
  }

}
