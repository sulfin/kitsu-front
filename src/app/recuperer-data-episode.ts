import { EpisodeRecupere } from "./episode-recupere";
import { IncludedEpisode } from "./included-episode";
import { LinksEpisode } from "./links-episode";

export interface RecupererDataEpisode {

  tableauEpisodeRecupere : EpisodeRecupere[],
  tableauIncluded : IncludedEpisode[],
  links : LinksEpisode
}
