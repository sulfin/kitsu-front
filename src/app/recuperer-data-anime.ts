import { Anime } from "./anime";
import { EpisodeRecupere } from "./episode-recupere";
import { LinksEpisode } from "./links-episode";

export interface RecupererDataAnime {

  tableauAnimeRecupere : Anime[],
  links : LinksEpisode
}
