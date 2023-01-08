import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {map, switchMap} from "rxjs";
import {AnimeService} from "../anime.service";
import {AnimeDetail} from "../anime-detail";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-anime',
  templateUrl: './anime.component.html',
  styleUrls: ['./anime.component.css']
})
export class AnimeComponent implements OnInit {

  anime: AnimeDetail | null = null

  selectedEpisode: string = ""
  youtubelink: SafeResourceUrl = new class implements SafeResourceUrl {
  }

  constructor(
    private activRoute: ActivatedRoute,
    private animeService: AnimeService,
    private _sanitizer: DomSanitizer,
  ) {
  }

  ngOnInit(): void {
    this.activRoute.paramMap.pipe(
      map(params => params.get('id') ?? ''),
      switchMap(id => this.animeService.getAnimeDetail(id))
    ).subscribe(
      animeDetail => {
        this.anime = animeDetail
        let link = `https://www.youtube.com/embed/${animeDetail.anime.youtubeVideoId}`
        this.youtubelink = this._sanitizer.bypassSecurityTrustResourceUrl(link)
        console.log(this.anime)
      }
    )
  }

  getLength(): number {
    return (this.anime?.anime.episodeLength ?? 0) * (this.anime?.anime.episodeCount ?? 0)
  }


}
