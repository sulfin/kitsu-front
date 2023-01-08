import { EpisodeRecupere } from "./episode-recupere";
import { IncludedEpisode } from "./included-episode";
import { Links } from "./links";

export interface RecupererDataEpisode {

  tableauEpisodeRecupere : EpisodeRecupere[],
  tableauIncluded : IncludedEpisode[],
  links : Links
}
