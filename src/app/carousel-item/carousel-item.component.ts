import {Component, Input, OnInit} from '@angular/core';
import {ItemAccueil} from "../item-accueil";

@Component({
  selector: 'app-carousel-item',
  templateUrl: './carousel-item.component.html',
  styleUrls: ['./carousel-item.component.css']
})
export class CarouselItemComponent implements OnInit {

  @Input() episode!: ItemAccueil

  constructor() { }

  ngOnInit(): void {
  }

}
