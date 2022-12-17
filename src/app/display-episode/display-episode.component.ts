import { Component, Input, OnInit } from '@angular/core';
import { EpisodeAffiche } from '../episode-affiche';

@Component({
  selector: 'app-display-episode',
  templateUrl: './display-episode.component.html',
  styleUrls: ['./display-episode.component.css']
})
export class DisplayEpisodeComponent implements OnInit {

  @Input() episode!: EpisodeAffiche;

  constructor() { }

  ngOnInit(): void {
  }

}
