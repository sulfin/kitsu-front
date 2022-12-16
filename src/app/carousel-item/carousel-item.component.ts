import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-carousel-item',
  templateUrl: './carousel-item.component.html',
  styleUrls: ['./carousel-item.component.css']
})
export class CarouselItemComponent implements OnInit {

  @Input() episode: any

  constructor() { }

  ngOnInit(): void {
  }

}
