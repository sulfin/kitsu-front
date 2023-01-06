import { Component, OnInit, Input } from '@angular/core';
import {Anime} from "../anime";

@Component({
  selector: 'app-categories-saison',
  templateUrl: './categories-saison.component.html',
  styleUrls: ['./categories-saison.component.css']
})
export class CategoriesSaisonComponent implements OnInit {

  @Input() categorie!: string
  @Input() liste!: Anime []

  constructor() { }

  ngOnInit(): void {
  }

}
