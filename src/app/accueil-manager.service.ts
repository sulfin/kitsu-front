import {Injectable} from '@angular/core';
import {map, Observable} from "rxjs";
import {EpisodeAccueil} from "./episode-accueil";
import {EpisodeService} from "./episode.service";
import {ItemAccueil} from "./item-accueil";
import {AnimeService} from "./anime.service";
import {Anime} from "./anime";

@Injectable({
  providedIn: 'root'
})
export class AccueilManagerService {

  constructor(
    private episodeService: EpisodeService,
    private animeService: AnimeService
  ) { }

  // Get the 10 last episode in the ItemAccueil format
  getLastEpisodes(): Observable<ItemAccueil[]>{
    return this.episodeService.getDataEpisode(this.episodeService.getUrlBase()).pipe(
      map(data => {
      let last_episodes: EpisodeAccueil[] = []
      data.tableauEpisodeRecupere.forEach(episode => {
        let anime = data.tableauIncluded.find(incl => incl.id === episode.idAnime)
        last_episodes.push({
          nom_anime: anime!.nom,
          nom_episode: episode.nom,
          numero_episode: episode.numeroEpisode,
          numero_saison: episode.numeroSaison,
          thumbnail: episode.image || anime!.image,
          id_anime: episode.idAnime
        })
      })
      return last_episodes
    }),
      map(episodes => {
        return episodes.map((e: EpisodeAccueil) => {
          return {
            image: e.thumbnail,
            lien: `/anime/${e.id_anime}`,
            titre: e.nom_anime,
            sous_titre: `S${e.numero_saison}E${e.numero_episode} · ${e.nom_episode}`
          }
        })
      }))
  }

  getTrending(): Observable<ItemAccueil[]>{
    return this.animeService.getAnimePopulaire().pipe(
      map(animes => animes.map((e: Anime)=>{
        return {
          image: e.posterImage||"",
          lien: `/anime/${e.id}`,
          titre: e.canonicalTitle,
          sous_titre: e.description
        }
      }))
    )
  }
}
