import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-carousel-accueil',
  templateUrl: './carousel-accueil.component.html',
  styleUrls: ['./carousel-accueil.component.css']
})
export class CarouselAccueilComponent implements OnInit {

  @Input() name = ''
  @Input() more_url = '#'
  @Input() episodes: any[] = []

  episodes_cur: any[] = []

  start_index = 0
  nb_episode = 5

  rbutton_disable: boolean = true
  lbutton_disable: boolean = true

  constructor() { }

  ngOnInit(): void {
    this.rbutton_disable = true
    this.lbutton_disable = true
    this.start_index = 0
    this.change_cur()
  }

  change_cur(){
    this.episodes_cur = this.episodes.slice(this.start_index,this.start_index + this.nb_episode)
    this.lbutton_disable = this.start_index + this.nb_episode >= this.episodes.length
    this.rbutton_disable = this.start_index <= 0
  }

  nextPage(){
    this.start_index += this.nb_episode
    this.change_cur()
  }

  prevPage(){
    this.start_index -= this.nb_episode
    this.change_cur()
  }

}
