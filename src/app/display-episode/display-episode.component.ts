import { Component, Input, OnInit } from '@angular/core';
import { Episode } from '../episode';

@Component({
  selector: 'app-display-episode',
  templateUrl: './display-episode.component.html',
  styleUrls: ['./display-episode.component.css']
})
export class DisplayEpisodeComponent implements OnInit {

  @Input() episode!: Episode;

  constructor() { }

  ngOnInit(): void {
  }

}
