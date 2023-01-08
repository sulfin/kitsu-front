export interface Anime{
  id: string,
  description: string,
  titles: {
    en_jp: string,
    en_us: string,
    ja_jp: string
  },
  canonicalTitle: string,
  startDate: string,
  endDate: string,
  subtype: string,
  status: string,
  posterImage: string|null,
  coverImage: string|null,
  episodeCount: number,
  episodeLength: number,
  youtubeVideoId: string,
  relationships: any,
}
