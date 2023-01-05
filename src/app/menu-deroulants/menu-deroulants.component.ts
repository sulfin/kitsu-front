import { Component, OnInit } from '@angular/core';
import {range} from "rxjs";
import {FormControl, FormGroup} from "@angular/forms";
import {SaisonsService} from "../saisons.service"

const rangeannee = range(1995, 30)

@Component({
  selector: 'app-menu-deroulants',
  templateUrl: './menu-deroulants.component.html',
  styleUrls: ['./menu-deroulants.component.css']
})
export class MenuDeroulantsComponent implements OnInit {
  DisplayAnnee: Array<number> = new Array<number>()

  SaisonAnneeForm: FormGroup
  SaisonCtrl: FormControl<string>
  AnneeCtrl: FormControl<number>


  constructor() {
    rangeannee.subscribe(
      (x) => {
        this.DisplayAnnee.push(x)
      }
    )
    this.SaisonCtrl = new FormControl<string>('winter',{nonNullable: true})
    this.AnneeCtrl = new FormControl<number>(2023, { nonNullable: true })

    this.SaisonAnneeForm = new FormGroup<any>({
      saison: this.SaisonCtrl,
      annee_val: this.AnneeCtrl
    })



    this.SaisonAnneeForm.valueChanges.subscribe(value => {
      this.submit()
    })

  }

  ngOnInit(): void {


  }
  submit(){
    console.log(this.SaisonCtrl.value)
    console.log(this.AnneeCtrl.value)
  }

}
