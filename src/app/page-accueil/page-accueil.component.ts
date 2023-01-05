import {Component, OnInit} from '@angular/core';
import {AccueilManagerService} from "../accueil-manager.service";
import {Observable} from "rxjs";
import {ItemAccueil} from "../item-accueil";

@Component({
  selector: 'app-page-accueil',
  templateUrl: './page-accueil.component.html',
  styleUrls: ['./page-accueil.component.css']
})
export class PageAccueilComponent implements OnInit {

  last_episode_source: Observable<ItemAccueil[]>

    constructor(private accueil_manager: AccueilManagerService) {
    this.last_episode_source = accueil_manager.getLastEpisodes()
  }

  ngOnInit(): void {

  }

}
