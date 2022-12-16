import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-display-episode',
  templateUrl: './display-episode.component.html',
  styleUrls: ['./display-episode.component.css']
})
export class DisplayEpisodeComponent implements OnInit {

  @Input() episode: any;

  constructor() { }

  ngOnInit(): void {
  }

}
