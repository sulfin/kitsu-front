import {Component, Input, OnInit} from '@angular/core';
import {Personnage} from "../personnage";

@Component({
  selector: 'app-personnage',
  templateUrl: './personnage.component.html',
  styleUrls: ['./personnage.component.css']
})
export class PersonnageComponent implements OnInit {

  @Input() personnage!: Personnage

  constructor() { }

  ngOnInit(): void {
  }

}
