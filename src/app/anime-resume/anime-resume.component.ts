import { Component, OnInit } from '@angular/core';
import {range} from "rxjs";

//const NbAnime = range(0, 30)
@Component({
  selector: 'app-anime-resume',
  templateUrl: './anime-resume.component.html',
  styleUrls: ['./anime-resume.component.css']
})
export class AnimeResumeComponent implements OnInit {

  //DisplayAnime: Array<number> = new Array<number>()
  constructor() {
  }

  ngOnInit(): void {
   /* NbAnime.subscribe(
      (x) => {
        this.DisplayAnime.push(x)
      }
    )*/
  }

}
