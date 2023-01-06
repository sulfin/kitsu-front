import { Component, Input, OnInit } from '@angular/core';
import { Anime } from '../anime';

@Component({
  selector: 'app-display-anime',
  templateUrl: './display-anime.component.html',
  styleUrls: ['./display-anime.component.css']
})
export class DisplayAnimeComponent implements OnInit {

  @Input() anime!: Anime;

  constructor() { }

  ngOnInit(): void {
  }

}
