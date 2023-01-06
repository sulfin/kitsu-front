import {Anime} from "./anime";
import {Personnage} from "./personnage";
import {EpisodeShort} from "./episode-short";

export interface AnimeDetail {
  anime: Anime,
  categories: string[],
  personnages: Personnage[],
  episodes: EpisodeShort[]
}
