import {Component, Input, OnInit} from '@angular/core';
import {Anime} from "../anime";

@Component({
  selector: 'app-carte-anime-saison',
  templateUrl: './carte-anime-saison.component.html',
  styleUrls: ['./carte-anime-saison.component.css']
})
export class CarteAnimeSaisonComponent implements OnInit {
  @Input() anime!: Anime
  constructor() { }

  ngOnInit(): void {
  }

}
